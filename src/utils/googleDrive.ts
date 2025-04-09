import { google, drive_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Bu bilgileri Google Cloud Console'dan alacaksınız
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.NODE_ENV === 'production'
  ? 'https://dosyatakip.vercel.app/api/auth/callback/google'
  : 'http://localhost:3000/api/auth/callback/google';
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const oauth2Client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

export const uploadFile = async (file: Express.Multer.File, customerId: string, documentType: string) => {
  try {
    // Müşteri için klasör oluştur veya var olanı bul
    const folderName = `customer_${customerId}`;
    if (!process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID) {
      throw new Error('GOOGLE_DRIVE_PARENT_FOLDER_ID is not defined');
    }

    const folderMetadata: drive_v3.Schema$File = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID]
    };

    let folderId;
    const folderExists = await drive.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(id)',
    });

    if (folderExists.data.files?.length) {
      folderId = folderExists.data.files[0].id;
    } else {
      const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id',
      });
      folderId = folder.data.id;
    }

    // Dosyayı yükle
    if (!folderId) {
      throw new Error('Could not create or find folder');
    }

    const fileMetadata: drive_v3.Schema$File = {
      name: `${documentType}_${new Date().toISOString()}`,
      parents: [folderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: file.buffer,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id,webViewLink',
    });

    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await drive.files.delete({
      fileId: fileId,
    });
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export const getFileList = async (customerId: string) => {
  try {
    const folderName = `customer_${customerId}`;
    const response = await drive.files.list({
      q: `'${folderName}' in parents`,
      fields: 'files(id, name, webViewLink, createdTime)',
    });
    return response.data.files;
  } catch (error) {
    console.error('Error getting file list:', error);
    throw error;
  }
};
