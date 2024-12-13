import { connectToDatabase } from "@/lib/mongoDB";
import { Shops } from "@/models/Shop";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const isTopShops = url.searchParams.get("isTopRated");

    let shops;
    const today = new Date();
    const todaysDate = today.getDate();

    if (isTopShops === "true") {
      shops = await Shops.find({
        endDate: { $gte: todaysDate },
      }).sort({ rating: -1 });
    } else {
      shops = await Shops.find({
        endDate: { $gte: todaysDate },
      });
    }

    return NextResponse.json(shops);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch current shops" },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { inputRating, inputSlug, ratedUser } = await request.json();
    await connectToDatabase();

    const getShop = await Shops.findOne({ slug: inputSlug });

    if (getShop.ratedUsers.includes(ratedUser)) {
      return NextResponse.json(
        { message: "You have Already Rated this shop." },
        { status: 400 }
      );
    }
    getShop.ratedUsers.push(ratedUser);
    getShop.ratingsArray.push(inputRating);

    const getRating =
      getShop.ratingsArray.reduce((a: number, b: number) => a + b, 0) /
      getShop.ratingsArray.length;

    await Shops.updateOne({ slug: inputSlug }, { $set: { rating: getRating } });

    await getShop.save();
    return NextResponse.json(
      { message: "Rated successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to rate the shop." },
      { status: 500 }
    );
  }
};