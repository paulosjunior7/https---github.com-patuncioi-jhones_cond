import { useState } from "react";
import type { FormData, FormErrors, SubmitMessage } from "../types";
import { fetchNui } from "../utils/fetchNui";

export const useFormManager = () => {
  const [formData, setFormData] = useState<FormData>({
    passportId: "",
    validity: "",
    name: "",
    value: "",
    type: "",
    signature: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage | null>(null);

  // Form validation function
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.passportId.trim()) {
      errors.passportId = "Passaporte é obrigatório";
    }
    
    if (!formData.validity) {
      errors.validity = "Validade é obrigatória";
    }
    
    if (!formData.name) {
      errors.name = "Tipo de documento é obrigatório";
    }
    
    if (!formData.type) {
      errors.type = "Categoria é obrigatória";
    }
    
    if (!formData.value.trim()) {
      errors.value = "Valor é obrigatório";
    }
    
    if (!formData.signature.trim()) {
      errors.signature = "Assinatura é obrigatória";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmitDocument = async (): Promise<void> => {
    if (!validateForm()) {
      setSubmitMessage({
        type: "error",
        message: "Por favor, preencha todos os campos obrigatórios",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = (await fetchNui("createDocument", {
        passportId: formData.passportId,
        validity: parseInt(formData.validity),
        documentType: formData.name,
        category: formData.type,
        value: formData.value,
        signature: formData.signature,
      })) as { success: boolean; message?: string };

      if (response?.success) {
        setSubmitMessage({
          type: "success",
          message: "Documento enviado para análise com sucesso!",
        });
        // Reset form
        resetForm();
      } else {
        setSubmitMessage({
          type: "error",
          message: response?.message || "Erro ao enviar documento",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: "Erro de conexão. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes with error clearing
  const handleInputChange = (field: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Clear submit message when user makes changes
    if (submitMessage) {
      setSubmitMessage(null);
    }
  };

  // Reset form
  const resetForm = (): void => {
    setFormData({
      passportId: "",
      validity: "",
      name: "",
      value: "",
      type: "",
      signature: "",
    });
    setFormErrors({});
    setSubmitMessage(null);
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    submitMessage,
    handleInputChange,
    handleSubmitDocument,
    resetForm,
  };
}; 