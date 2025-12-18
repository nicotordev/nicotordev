import conceAI from "@/lib/api/conceai";
import { type NewContactRequestSchema } from "@/schemas/user.schema";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function useConceAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<any | null>(null);

  const t = useTranslations("leadMagnet.form");

  const sendContactRequest = async (data: NewContactRequestSchema) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setData(null);

    try {
      const response = await conceAI.newContactRequest(data, t);
      setData(response);
      setSuccess(true);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    data,
    sendContactRequest,
  };
}
