import { SupplierArticles, SupplierParts } from "@/models";
import { useToast } from "@chakra-ui/react";
import React, { useState, createContext, useContext } from "react";

type OrdersContextType = {
  parts: SupplierParts[] | undefined;
  articles: SupplierArticles[] | undefined;
  handleAddOrderPart: (orderPart: SupplierParts) => void;
  handleUpdateOrderParts: (orderParts: SupplierParts[]) => void;
  handleRemoveOrderPart: (orderPartReference: string) => void;
  handleUpdatePart: (orderPart: SupplierParts, orderPartIndex: number) => void;
  handleResetOrderParts: () => void;
  handleAddArticle: (article: SupplierArticles) => void;
  handleRemoveArticle: (articleReference: string) => void;
  handleUpdateArticle: (
    article: SupplierArticles,
    articleIndex: number
  ) => void;
  handleAddOrderParts: (orderParts: SupplierParts[]) => void;
  handleAddArticles: (orderParts: SupplierArticles[]) => void;
};

export const SupplierPartsContext = createContext<
  OrdersContextType | undefined
>(undefined);

export default function SupplierPartsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [parts, setParts] = useState<SupplierParts[]>([]);

  const [articles, setArticles] = useState<SupplierArticles[]>([]);

  const toast = useToast();

  const isOrderPartAlreadyAdded = (orderPart: SupplierParts) => {
    const reference = orderPart.referenceNumber;
    const containsOrder = parts.find((o) => o.referenceNumber === reference);
    return containsOrder;
  };

  const handleAddOrderPart = (orderPart: SupplierParts) => {
    setParts((oldOrders) => {
      if (!isOrderPartAlreadyAdded(orderPart)) {
        toast({
          title: "SUCESSO",
          description: "A PEÇA CRIADA FOI ADICIONADA COM SUCESSO!",
          status: "success",
        });
        return [...oldOrders, orderPart];
      }
      toast({
        title: "ERRO",
        description:
          "HOUVE UM ERRO AO ADICIONAR A PEÇA, VERIFIQUE SE ELA JÁ NÃO FOI ADICIONADA ANTERIORMENTE OU SE A REFERENCIA DA PEÇA JÁ EXISTE NA LISTA!",
        status: "error",
      });
      return oldOrders;
    });
  };

  const handleAddOrderParts = (orderParts: SupplierParts[]) => {
    setParts((oldOrders) => {
      oldOrders = orderParts;
      return oldOrders;
    });
  };

  const handleAddArticles = (orderParts: SupplierArticles[]) => {
    setArticles((oldArticles) => {
      oldArticles = orderParts;
      return oldArticles;
    });
  };

  const handleUpdateOrderParts = (orderParts: SupplierParts[]) => {
    setParts(orderParts);
  };

  const handleRemoveOrderPart = (orderPartReference: string) => {
    setParts((oldOrders) => {
      return oldOrders.filter((o) => o.referenceNumber !== orderPartReference);
    });
  };

  const handleUpdatePart = (
    orderPart: SupplierParts,
    orderPartIndex: number
  ) => {
    const isSameReference =
      parts[orderPartIndex].referenceNumber === orderPart.referenceNumber;
    if (!isSameReference && isOrderPartAlreadyAdded(orderPart)) {
      toast({
        title: "ERRO",
        description:
          "HOUVE UM ERRO AO ADICIONAR A PEÇA, VERIFIQUE SE ELA JÁ NÃO FOI ADICIONADA ANTERIORMENTE OU SE A REFERENCIA DA PEÇA JÁ EXISTE NA LISTA!",
        status: "error",
      });
    } else {
      setParts((oldOrders) => {
        let newArr = [...oldOrders];
        newArr[orderPartIndex] = orderPart;
        return newArr;
      });
    }
  };

  const handleResetOrderParts = () => {
    setParts([]);
    setArticles([]);
  };

  const isArticleAlreadyAdded = (orderPart: SupplierArticles) => {
    const reference = orderPart.name;
    const containsOrder = articles.find((o) => o.name === reference);
    return containsOrder;
  };

  const handleAddArticle = (article: SupplierArticles) => {
    setArticles((oldArticles) => {
      if (!isArticleAlreadyAdded(article)) {
        toast({
          title: "SUCESSO",
          description: "O ARTIGO CRIADO FOI ADICIONADO COM SUCESSO!",
          status: "success",
        });
        return [...oldArticles, article];
      }
      toast({
        title: "ERRO",
        description:
          "HOUVE UM ERRO AO ADICIONAR O ARTIGO, VERIFIQUE SE ELA JÁ NÃO FOI ADICIONADA ANTERIORMENTE OU SE O NOME DO ARTIGO JÁ EXISTE NA LISTA!",
        status: "error",
      });
      return oldArticles;
    });
  };

  const handleUpdateArticle = (
    article: SupplierArticles,
    articleIndex: number
  ) => {
    setArticles((oldArticles) => {
      let newArr = [...oldArticles];
      newArr[articleIndex] = article;
      return newArr;
    });
  };

  const handleRemoveArticle = (articleReference: string) => {
    setArticles((oldArticles) => {
      return oldArticles.filter((o) => o.name !== articleReference);
    });
  };

  return (
    <SupplierPartsContext.Provider
      value={{
        parts,
        articles,
        handleAddOrderPart,
        handleUpdateOrderParts,
        handleRemoveOrderPart,
        handleUpdatePart,
        handleResetOrderParts,
        handleAddArticle,
        handleUpdateArticle,
        handleRemoveArticle,
        handleAddOrderParts,
        handleAddArticles,
      }}
    >
      {children}
    </SupplierPartsContext.Provider>
  );
}

export const useSupplierParts = () => {
  const context = useContext(SupplierPartsContext);

  if (context === undefined) {
    throw new Error(
      "useSupplierParts must be used within a SupplierPartsProvider"
    );
  }

  return context;
};
