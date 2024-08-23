import config from "../config-variable/config";
import { Databases, Client, Storage, ID, Query } from "appwrite";

class Blog {
    client = new Client()
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.APPWRITE_URL)
            .setProject(config.APPWRITE_PROJECT_ID)

        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)

    }

    //Create Blog

    async createsDocuments({
        title,
        content,
        content_image,
        status,
        userId,
        slug,
        description
    }) {
        try {
            return await this.database.createDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    content_image,
                    status,
                    userId,
                    slug,
                    description
                }
            )
        } catch (error) {
            console.log(`Appwrite Service Error- ${error}`)
        }
    }

    //Read Blogs
    async readDocuments(query = [Query.equal('status', 'active')]) {
        try {
            const readPost = await this.database.listDocuments(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                query
            )
            return readPost;
        } catch (error) {
            console.log(`Appwrite Service Error- ${error}`)
            return false
        }
    }

    //Read Blog
    async readDocument(slug) {
        try {
            const readPost = await this.database.getDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                slug
            )
            return readPost;
        } catch (error) {
            console.log(`Appwrite Service Error - ${error}`)
        }
    }

    //update blog
    async updateDocument(slug, { title, content, content_image, status, description }) {
        try {
            const updatePost = await this.database.updateDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    content_image,
                    status,
                    description
                }
            )
            return updatePost;
        } catch (error) {
            console.log(`Appwrite Service Error - ${error}`)
            return false;
        }
    }

    //delete blog
    async deleteDocument(slug) {
        try {
            await this.database.deleteDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                slug,
            )
            return true;
        } catch (error) {
            console.log(`Appwrite Service Error - ${error}`)
        }
    }

    // File Handling 

    //Upload File
    async uploadFile(file) {
        try {
            const upload = await this.bucket.createFile(
                config.APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
            return upload

        } catch (error) {
            console.log(`Appwrite Service Error - ${error}`)
            return false
        }
    }

    async removeFile(fileID) {
        try {
             await this.bucket.deleteFile(
                config.APPWRITE_BUCKET_ID,
                fileID
            )

        } catch (error) {
            if (error.code === 404) {
                console.log("File not found, likely already deleted.")
            } else {
                console.log(`Appwrite Service Error - ${error.message}`)
            }
            return false
        }
    }


    //View file
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.APPWRITE_BUCKET_ID,
            fileId
        )
    }
}

const BlogServies = new Blog()

export default BlogServies;

