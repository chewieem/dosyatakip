import { NextResponse } from 'next/server';
import { uploadFile, deleteFile, getFileList } from '@/utils/googleDrive';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const customerId = formData.get('customerId') as string;
    const documentType = formData.get('documentType') as string;

    if (!file || !customerId || !documentType) {
      return NextResponse.json(
        { error: 'File, customerId, and documentType are required' },
        { status: 400 }
      );
    }

    const result = await uploadFile(file, customerId, documentType);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in POST /api/documents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { fileId } = await req.json();
    
    if (!fileId) {
      return NextResponse.json(
        { error: 'FileId is required' },
        { status: 400 }
      );
    }

    await deleteFile(fileId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/documents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId');

    if (!customerId) {
      return NextResponse.json(
        { error: 'CustomerId is required' },
        { status: 400 }
      );
    }

    const files = await getFileList(customerId);
    return NextResponse.json(files);
  } catch (error) {
    console.error('Error in GET /api/documents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
