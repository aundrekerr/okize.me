// app/api/(move)/move/hitboxes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

export async function GET(request: NextRequest) {
  const bucketName = process.env.BUCKET_NAME;
  // The path to the move's S3 bucket folder
  const move = request.nextUrl.searchParams.get('move')
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: move || ''
    });
    const data = await s3Client.send(command);
    const files = data.Contents?.map((item) => `https://${process.env.CLOUDFRONT_DISTRIBUTION_DOMAIN}/${item.Key}`) || [];
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Error listing files' }, { status: 500 });
  }
}
