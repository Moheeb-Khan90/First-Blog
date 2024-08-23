import config from '../config-variable/config.js'
import { Client, Account, ID } from "appwrite"

export class Authentication {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.APPWRITE_URL)
            .setProject(config.APPWRITE_PROJECT_ID);
        this.account = new Account(this.client);

    }

    //Create Account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log(`Appwrite Service Error - ${error}`)
        }
    }

    //Login Account
    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password)
            return session
        } catch (error) {
            throw new Error(error.message || 'Login failed')
        }
    }

    //Current User
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log(`Appwrite Service Error - ${error}`)
        }

        return null;
    }

    //Logout Account
    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log(`Appwrite Service Error - ${error}`)
        }
    }
}

const authService = new Authentication();

export default authService