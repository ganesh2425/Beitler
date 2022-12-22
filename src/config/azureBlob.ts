import { BlobServiceClient} from '@azure/storage-blob';
import FileSaver from "file-saver";

const sasToken = process.env.REACT_APP_STORAGE_SAS_TOKEN;
const containerName = process.env.REACT_APP_STORAGE_CONTAINER_NAME;
const storageAccountName = process.env.REACT_APP_STORAGE_RESOURCE_NAME;

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
    return !((!storageAccountName || !sasToken));
};

// return list of blobs in container to display
const getBlobsInContainer = async (containerClient: any) => {
    const returnedBlobUrls = [];

    // get list of blobs in container
    // eslint-disable-next-line
    for await (const blob of containerClient.listBlobsFlat()) {
        // if image is public, just construct URL
        returnedBlobUrls.push(
            `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
        );
    }

    return returnedBlobUrls;
};


const createBlobInContainer = async (containerClient: any, file: any) => {

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadBrowserData(file, options);
    await blobClient.setMetadata({UserName : 'lmsafs'});
};

export const uploadFileToBlob = async (file: any) => {
    if (!file) return [];

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    // get Container - full public read access
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const containerClient = blobService.getContainerClient(containerName);

    // upload file
    await createBlobInContainer(containerClient, file);

    // get list of blobs in container
    return getBlobsInContainer(containerClient);
};

// export default uploadFileToBlob;

export const downloadTemplateFile = async (fileName: string, containerName = 'templates') => {
    const downloadContainerName =  containerName //'templates'
    const blobServiceClient = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const containerClient = blobServiceClient.getContainerClient(downloadContainerName);

    const blobClient = containerClient.getBlobClient(fileName);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const downloadBlockBlobResponse = await blobClient.download(fileName, 0, undefined);
    const data = await downloadBlockBlobResponse.blobBody;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    FileSaver.saveAs(data, fileName);
}