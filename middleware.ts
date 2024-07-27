import { NextResponse, NextRequest } from "next/server"

const Middleware = (req: NextRequest) => {
  // return NextResponse.rewrite(new URL(req.nextUrl.pathname.toLocaleLowerCase(), req.url));
}

export default Middleware