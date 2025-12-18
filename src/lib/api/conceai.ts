import axios from "axios";
import {
  newContactRequestSchema,
  type NewContactRequestSchema,
} from "./../../schemas/user.schema";

function getConceAIUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL;
  if (!fromEnv) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }
  return fromEnv.replace(/\/$/, "");
}

const axiosInstance = axios.create({
  baseURL: getConceAIUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

const conceAI = {
  newContactRequest: async (data: NewContactRequestSchema, t: any) => {
    const validatedData = newContactRequestSchema(t).safeParse(data);

    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }

    const response = await axiosInstance.post(
      "/api/v1/help",
      validatedData.data
    );
    return response.data;
  },
};

export default conceAI;
