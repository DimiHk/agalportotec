import * as yup from "yup";

const authenticationSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("FORMATO DO EMAIL INVÁLIDO, EX: GABRIEL@GMAIL.COM")
      .required("EMAIL OBRIGATÓRIO!"),
    password: yup.string().required("PALAVRA-PASSE OBRIGATÓRIA!"),
  })
  .required();

const enterpriseClientSchema = yup.object().shape({
  name: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DA EMPRESA.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  employeeName: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DO FUNCIONÁRIO.")
    .max(100, "MAXIMO 100 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  email: yup
    .string()
    .email("POR FAVOR, INSIRA UM E-MAIL VÁLIDO. EX: email@email.com")
    .max(100, "MAXIMO 100 CARACTERES"),
  address: yup
    .string()
    .required("POR FAVOR, INSIRA A MORADA.")
    .max(255, "MAXIMO 255 CARACTERES"),
  postalCode: yup.string(),
  additionalAddress: yup.string().max(255, "MAXIMO 255 CARACTERES"),
  taxNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DO CONTRIBUINTE : EX: 255101234")
    .matches(
      /^[A-Za-z0-9]+$/,
      "POR FAVOR, INSIRA UM NÚMERO DE CONTRIBUINTE VÁLIDO: 255101234"
    ),
  directPhoneNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DE TELEFONE DIRETO.")
    .matches(
      /^[0-9+\s.-]*$/,
      "POR FAVOR, INSIRA UM NÚMERO DE TELEFONE DIRETO VÁLIDO. EX: 912345678"
    )
    .max(50, "MAXIMO 50 CARACTERES"),
  generalPhoneNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DE TELEFONE GERAL.")
    .matches(
      /^[0-9+\s.-]*$/,
      "POR FAVOR, INSIRA UM NÚMERO DE TELEFONE GERAL VÁLIDO. EX: 912345678"
    )
    .max(50, "MAXIMO 50 CARACTERES"),
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
  sendEmails: yup.bool(),
  supplementaryEmail: yup
    .string()
    .email("POR FAVOR, INSIRA UM E-MAIL VÁLIDO. EX: email@email.com")
    .max(100, "MAXIMO 100 CARACTERES"),
});

const privateClientSchema = yup.object().shape({
  name: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DA EMPRESA.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  email: yup
    .string()
    .email("POR FAVOR, INSIRA UM E-MAIL VÁLIDO. EX: email@email.com")
    .max(100, "MAXIMO 100 CARACTERES"),
  address: yup
    .string()
    .required("POR FAVOR, INSIRA A MORADA.")
    .max(255, "MAXIMO 255 CARACTERES"),
  postalCode: yup.string(),
  additionalAddress: yup.string().max(255, "MAXIMO 255 CARACTERES"),
  taxNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DO CONTRIBUINTE.")
    .required("POR FAVOR, INSIRA O NÚMERO DO CONTRIBUINTE : EX: 255101234")
    .matches(
      /^[A-Za-z0-9]+$/,
      "POR FAVOR, INSIRA UM NÚMERO DE CONTRIBUINTE VÁLIDO: 255101234"
    ),
  directPhoneNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DE TELEFONE DIRETO.")
    .matches(
      /^[0-9+\s.-]*$/,
      "POR FAVOR, INSIRA UM NÚMERO DE TELEFONE DIRETO VÁLIDO EX: 912345678"
    )
    .max(50, "MAXIMO 50 CARACTERES"),
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
  sendEmails: yup.bool(),
});

const clientDetailsSchema = yup.object().shape({
  clientId: yup.string().required("POR FAVOR, SELECIONE O CLIENTE."),
});

const createPrivateClientOrderOrderPartsSchema = yup.object().shape({
  name: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DO PRODUTO.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  reference: yup
    .string()
    .required("POR FAVOR, INSIRA A REFERÊNCIA DO PRODUTO.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  price: yup
    .number()
    .typeError("POR FAVOR, INSIRA O PREÇO DO PRODUTO.")
    .required("POR FAVOR, INSIRA O PREÇO DO PRODUTO.")
    .min(0.01, "MINIMO 0.01€"),
});

const createPrivateClientPaymentDataSchema = yup.object().shape({
  paymentMethod: yup
    .number()
    .required("POR FAVOR, SELECIONE O MÉTODO DE PAGAMENTO."),
  shipmentMethod: yup
    .number()
    .required("POR FAVOR, SELECIONE O MÉTODO DE ENVIO."),
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
});

const createPrivateClientShipmentSchema = yup.object().shape({
  name: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DO CLIENTE.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  surname: yup
    .string()
    .required("POR FAVOR, INSIRA O APELIDO DO CLIENTE.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  address: yup
    .string()
    .required("POR FAVOR, INSIRA A MORADA DO CLIENTE.")
    .max(255, "MAXIMO 255 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),

  postalCode: yup
    .string()
    .matches(
      /^\d{4}-\d{3}$/,
      "O CODIGO POSTAL DEVE ESTAR NO SEGUINTE FORMATO: 0000-000"
    )
    .required("POR FAVOR, INSIRA O CÓDIGO POSTAL."),
  city: yup
    .string()
    .required("POR FAVOR, INSIRA A CIDADE DO CLIENTE.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  phoneNumber: yup
    .string()
    .matches(
      /^[0-9+\s.-]*$/,
      "POR FAVOR, INSIRA UM NÚMERO DE TELEFONE DIRETO VÁLIDO. EX: 912345678"
    )
    .required("POR FAVOR, INSIRA O NÚMERO DE TELEFONE DIRETO."),
  taxNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DO CONTRIBUINTE : EX: 255101234")
    .matches(
      /^[A-Za-z0-9]+$/,
      "POR FAVOR, INSIRA UM NÚMERO DE CONTRIBUINTE VÁLIDO: 255101234"
    ),
});

const createPrivateClientEmailSchema = yup.object().shape({
  sendEmails: yup.bool(),
  sendEmailDate: yup.string().when("sendEmails", {
    is: (sendEmails: any) => sendEmails === true,
    then: () =>
      yup
        .string()
        .typeError("POR FAVOR, SELECIONE A DATA DE ENVIO.")
        .required("POR FAVOR, SELECIONE A DATA DE ENVIO."),
  }),
});

const createInvoiceSchema = yup.object().shape({
  date: yup.string(),
  status: yup.number(),
  total: yup
    .number()
    .typeError("POR FAVOR, INSIRA O PREÇO TOTAL DA FATURA.")
    .min(0.01, "MINIMO 0.01€"),
  file: yup.mixed().required("POR FAVOR, SLECIONE O FICHEIRO DA FATURA."),
  timeFrame: yup.number(),
  dayOfWeek: yup.number(),
  sendEmails: yup.bool(),
});

const updatePrivateClientOrderSchema = yup.object().shape({
  orderNumber: yup.string(),
  purchaseOrderNumber: yup.number(),
  paymentMethod: yup.number(),
  shipmentMethod: yup.number(),
  sendEmailDate: yup.string(),
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
  sendEmails: yup.bool(),
  parts: yup.array(createPrivateClientOrderOrderPartsSchema),
  newParts: yup.array(createPrivateClientOrderOrderPartsSchema),
  shipmentName: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .required("POR FAVOR, INSIRA O NOME DO CLIENTE.")
        .max(200, "MAXIMO 200 CARACTERES")
        .min(3, "MINIMO 3 CARACTERES"),
  }),
  shipmentSurname: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .required("POR FAVOR, INSIRA O APELIDO DO CLIENTE.")
        .max(200, "MAXIMO 200 CARACTERES")
        .min(3, "MINIMO 3 CARACTERES"),
  }),
  shipmentAddress: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .required("POR FAVOR, INSIRA A MORADA DO CLIENTE.")
        .max(255, "MAXIMO 255 CARACTERES")
        .min(3, "MINIMO 3 CARACTERES"),
  }),
  shipmentPostalCode: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .matches(
          /^\d{4}-\d{3}$/,
          "O CODIGO POSTAL DEVE ESTAR NO SEGUINTE FORMATO: 0000-000"
        )
        .required("POR FAVOR, INSIRA O CÓDIGO POSTAL."),
  }),
  shipmentCity: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .required("POR FAVOR, INSIRA A CIDADE DO CLIENTE.")
        .max(200, "MAXIMO 200 CARACTERES")
        .min(3, "MINIMO 3 CARACTERES"),
  }),
  shipmentPhoneNumber: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .matches(
          /^[0-9+\s.-]*$/,
          "POR FAVOR, INSIRA UM NÚMERO DE TELEFONE DIRETO VÁLIDO. : EX: 912345678"
        )
        .required("POR FAVOR, INSIRA O NÚMERO DE TELEFONE DIRETO."),
  }),
  shipmentTaxNumber: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .required("POR FAVOR, INSIRA O NÚMERO DO CONTRIBUINTE : EX: 255101234")
        .matches(
          /^[A-Za-z0-9]+$/,
          "POR FAVOR, INSIRA UM NÚMERO DE CONTRIBUINTE VÁLIDO: 255101234"
        ),
  }),
});

const updateEnterpriseClientOrderSchema = yup.object().shape({
  orderNumber: yup.string(),
  purchaseOrderNumber: yup.number(),
  paymentMethod: yup.number(),
  shipmentMethod: yup.number(),
  sendEmailDate: yup.string(),
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
  sendEmails: yup.bool(),
  parts: yup.array(createPrivateClientOrderOrderPartsSchema),
  newParts: yup.array(createPrivateClientOrderOrderPartsSchema),
  shipmentName: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .required("POR FAVOR, INSIRA O NOME DO CLIENTE.")
        .max(200, "MAXIMO 200 CARACTERES")
        .min(3, "MINIMO 3 CARACTERES"),
  }),
  shipmentSurname: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .required("POR FAVOR, INSIRA O APELIDO DO CLIENTE.")
        .max(200, "MAXIMO 200 CARACTERES")
        .min(3, "MINIMO 3 CARACTERES"),
  }),
  shipmentAddress: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .required("POR FAVOR, INSIRA A MORADA DO CLIENTE.")
        .max(255, "MAXIMO 255 CARACTERES")
        .min(3, "MINIMO 3 CARACTERES"),
  }),
  shipmentPostalCode: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .matches(
          /^\d{4}-\d{3}$/,
          "O CODIGO POSTAL DEVE ESTAR NO SEGUINTE FORMATO: 0000-000"
        )
        .required("POR FAVOR, INSIRA O CÓDIGO POSTAL."),
  }),
  shipmentCity: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .required("POR FAVOR, INSIRA A CIDADE DO CLIENTE.")
        .max(200, "MAXIMO 200 CARACTERES")
        .min(3, "MINIMO 3 CARACTERES"),
  }),
  shipmentPhoneNumber: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .matches(
          /^[0-9+\s.-]*$/,
          "POR FAVOR, INSIRA UM NÚMERO DE TELEFONE DIRETO VÁLIDO.: EX: 912345678"
        )
        .required(
          "POR FAVOR, INSIRA O NÚMERO DE TELEFONE DIRETO.: EX: 912345678"
        ),
  }),
  shipmentTaxNumber: yup.string().when("shipmentMethod", {
    is: (shipmentMethod: any) => shipmentMethod === 0,
    then: () =>
      yup
        .string()
        .required("POR FAVOR, INSIRA O NÚMERO DO CONTRIBUINTE : EX: 255101234")
        .matches(
          /^[A-Za-z0-9]+$/,
          "POR FAVOR, INSIRA UM NÚMERO DE CONTRIBUINTE VÁLIDO: 255101234"
        ),
  }),
});

const updateEnterpriseInvoiceSchema = yup.object().shape({
  date: yup.string(),
  status: yup.number(),
  total: yup
    .number()
    .typeError("POR FAVOR, INSIRA O PREÇO TOTAL DA FATURA.")
    .min(0.01, "MINIMO 0.01€"),
  file: yup.mixed(),
  timeFrame: yup.number(),
  dayOfWeek: yup.number(),
  sendEmails: yup.bool(),
});

const updatePrivateInvoiceSchema = yup.object().shape({
  date: yup.string(),
  status: yup.number(),
  total: yup
    .number()
    .typeError("POR FAVOR, INSIRA O PREÇO TOTAL DA FATURA.")
    .min(0.01, "MINIMO 0.01€"),
  file: yup.mixed(),
  timeFrame: yup.number(),
  dayOfWeek: yup.number(),
  sendEmails: yup.bool(),
});

const createSupplierSchema = yup.object().shape({
  companyName: yup.string().required("POR FAVOR, INSIRA O NOME DA EMPRESA."),
  name: yup.string().required("POR FAVOR, INSIRA O NOME DO FORNECEDOR."),
  email: yup
    .string()
    .email("POR FAVOR, INSIRA UM E-MAIL VÁLIDO. EX: email@email.com")
    .required("POR FAVOR, INSIRA O E-MAIL.")
    .max(100, "MAXIMO 100 CARACTERES"),
  address: yup
    .string()
    .required("POR FAVOR, INSIRA A MORADA.")
    .max(255, "MAXIMO 255 CARACTERES"),
  taxNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DO CONTRIBUINTE : EX: 255101234")
    .matches(
      /^[A-Za-z0-9]+$/,
      "POR FAVOR, INSIRA UM NÚMERO DE CONTRIBUINTE VÁLIDO: 255101234"
    ),
  directPhoneNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DE TELEFONE DIRETO.")
    .matches(
      /^[0-9+\s.-]*$/,
      "POR FAVOR, INSIRA UM NÚMERO DE TELEFONE DIRETO VÁLIDO."
    )
    .max(50, "MAXIMO 50 CARACTERES"),
  generalPhoneNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DE TELEFONE GERAL.")
    .matches(
      /^[0-9+\s.-]*$/,
      "POR FAVOR, INSIRA UM NÚMERO DE TELEFONE GERAL VÁLIDO."
    )
    .max(50, "MAXIMO 50 CARACTERES"),
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
  sendEmails: yup.bool(),
  image: yup.mixed(),
});

const updateSupplierSchema = yup.object().shape({
  companyName: yup.string().required("POR FAVOR, INSIRA O NOME DA EMPRESA."),
  name: yup.string().required("POR FAVOR, INSIRA O NOME DO FORNECEDOR."),
  email: yup
    .string()
    .email("POR FAVOR, INSIRA UM E-MAIL VÁLIDO. EX: email@email.com")
    .required("POR FAVOR, INSIRA O E-MAIL.")
    .max(100, "MAXIMO 100 CARACTERES"),
  address: yup
    .string()
    .required("POR FAVOR, INSIRA A MORADA.")
    .max(255, "MAXIMO 255 CARACTERES"),
  taxNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DO CONTRIBUINTE : EX: 255101234")
    .matches(
      /^[A-Za-z0-9]+$/,
      "POR FAVOR, INSIRA UM NÚMERO DE CONTRIBUINTE VÁLIDO: 255101234"
    ),
  directPhoneNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DE TELEFONE DIRETO. EX: 912345678")
    .matches(
      /^[0-9+\s.-]*$/,
      "POR FAVOR, INSIRA UM NÚMERO DE TELEFONE DIRETO VÁLIDO. EX: 912345678"
    )
    .max(50, "MAXIMO 50 CARACTERES"),
  generalPhoneNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DE TELEFONE GERAL. EX: 912345678")
    .matches(
      /^[0-9+\s.-]*$/,
      "POR FAVOR, INSIRA UM NÚMERO DE TELEFONE GERAL VÁLIDO. EX: 912345678"
    )
    .max(50, "MAXIMO 50 CARACTERES"),
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
  sendEmails: yup.bool(),
  image: yup.mixed(),
});

const supplierDetailSchema = yup.object().shape({
  supplierId: yup.string().required("POR FAVOR, SELECIONE O FORNECEDOR."),
});

const createSupplierOrderPartsSchema = yup.object().shape({
  name: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DO PRODUTO.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  referenceNumber: yup
    .string()
    .required("POR FAVOR, INSIRA A REFERÊNCIA DO PRODUTO.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  price: yup
    .number()
    .typeError("POR FAVOR, INSIRA O PREÇO DO PRODUTO.")
    .required("POR FAVOR, INSIRA O PREÇO DO PRODUTO.")
    .min(0.01, "MINIMO 0.01€"),
  quantity: yup
    .number()
    .typeError("POR FAVOR, INSIRA A QUANTIDADE DO PRODUTO.")
    .required("POR FAVOR, INSIRA A QUANTIDADE DO PRODUTO.")
    .min(1, "MINIMO 1 UNIDADE"),
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
});

const createSupplierOrderArticlesSchema = yup.object().shape({
  name: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DO PRODUTO.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  price: yup
    .number()
    .typeError("POR FAVOR, INSIRA O PREÇO DO PRODUTO.")
    .required("POR FAVOR, INSIRA O PREÇO DO PRODUTO.")
    .min(0.01, "MINIMO 0.01€"),
  quantity: yup
    .number()
    .typeError("POR FAVOR, INSIRA A QUANTIDADE DO PRODUTO.")
    .required("POR FAVOR, INSIRA A QUANTIDADE DO PRODUTO.")
    .min(1, "MINIMO 1 UNIDADE"),
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
});

const createSupplierDetailsSchema = yup.object().shape({
  deliveryNumber: yup
    .string()
    .min(3, "MINIMO 3 CARACTERES")
    .required("POR FAVOR, INSIRA O NÚMERO DE ENTREGA."),
  date: yup.string(),
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
});

const removeSupplierOrderPartsAndArticlesSchema = yup.object().shape({
  notes: yup.string().max(255, "MAXIMO 255 CARACTERES"),
});

const createStockDetailsSchema = yup.object().shape({
  name: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DO PRODUTO.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  reference: yup
    .string()
    .required("POR FAVOR, INSIRA A REFERÊNCIA DO PRODUTO.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  wareHouseLocation: yup
    .string()
    .required("POR FAVOR, INSIRA A LOCALIZAÇÃO DO PRODUTO.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  quantity: yup
    .number()
    .typeError("POR FAVOR, INSIRA A QUANTIDADE DO PRODUTO.")
    .required("POR FAVOR, INSIRA A QUANTIDADE DO PRODUTO.")
    .min(1, "MINIMO 1 UNIDADE"),
  sellingPrice: yup
    .number()
    .typeError("POR FAVOR, INSIRA O PREÇO DE VENDA DO PRODUTO.")
    .required("POR FAVOR, INSIRA O PREÇO DE VENDA DO PRODUTO.")
    .min(0.01, "MINIMO 0.01€"),
  boughtPrice: yup
    .number()
    .typeError("POR FAVOR, INSIRA O PREÇO DE COMPRA DO PRODUTO.")
    .required("POR FAVOR, INSIRA O PREÇO DE COMPRA DO PRODUTO.")
    .min(0.01, "MINIMO 0.01€"),
});

const createAccountingInvoiceSchema = yup.object().shape({
  documentNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DO DOCUMENTO."),
  expiryDate: yup.string().required("POR FAVOR, INSIRA A DATA DE VENCIMENTO."),
  total: yup
    .number()
    .typeError("POR FAVOR, INSIRA O PREÇO TOTAL DA FATURA.")
    .required("POR FAVOR, INSIRA O PREÇO TOTAL DA FATURA.")
    .min(0.01, "MINIMO 0.01€"),
  status: yup.number().required("POR FAVOR, SELECIONE O ESTADO DA FATURA."),
  paymentNumber: yup
    .string()
    .required("POR FAVOR, INSIRA O NÚMERO DE PAGAMENTO."),
});

const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DO UTILIZADOR.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  email: yup
    .string()
    .email("POR FAVOR, INSIRA UM E-MAIL VÁLIDO. EX: email@email.com")
    .required("POR FAVOR, INSIRA O E-MAIL.")
    .max(100, "MAXIMO 100 CARACTERES"),
  userType: yup.number().required("POR FAVOR, SELECIONE O TIPO DE UTILIZADOR."),
  password: yup.string().required("PALAVRA-PASSE OBRIGATÓRIA!"),
});

const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DO UTILIZADOR.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  email: yup
    .string()
    .email("POR FAVOR, INSIRA UM E-MAIL VÁLIDO. EX: email@email.com")
    .required("POR FAVOR, INSIRA O E-MAIL.")
    .max(100, "MAXIMO 100 CARACTERES"),
  type: yup.number().required("POR FAVOR, SELECIONE O TIPO DE UTILIZADOR."),
  newPassword: yup.string(),
  newPasswordConfirmation: yup.string().when("newPassword", {
    is: (newPassword: any) => newPassword !== "",
    then: () =>
      yup
        .string()
        .required("POR FAVOR, CONFIRME A NOVA PALAVRA-PASSE.")
        .oneOf([yup.ref("newPassword")], "AS PALAVRAS-PASSE NÃO COINCIDEM."),
  }),
});

const updateProfileSchema = yup.object().shape({
  name: yup
    .string()
    .required("POR FAVOR, INSIRA O NOME DO UTILIZADOR.")
    .max(200, "MAXIMO 200 CARACTERES")
    .min(3, "MINIMO 3 CARACTERES"),
  email: yup
    .string()
    .email("POR FAVOR, INSIRA UM E-MAIL VÁLIDO. EX: email@email.com")
    .required("POR FAVOR, INSIRA O E-MAIL.")
    .max(100, "MAXIMO 100 CARACTERES"),
  newPassword: yup.string(),
  newPasswordConfirmation: yup.string().when("newPassword", {
    is: (newPassword: any) => newPassword !== "",
    then: () =>
      yup
        .string()
        .required("POR FAVOR, CONFIRME A NOVA PALAVRA-PASSE.")
        .oneOf([yup.ref("newPassword")], "AS PALAVRAS-PASSE NÃO COINCIDEM."),
  }),
});

const resetPasswordEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("POR FAVOR, INSIRA UM E-MAIL VÁLIDO. EX: email@email.com")
    .required("POR FAVOR, INSIRA O E-MAIL.")
    .max(100, "MAXIMO 100 CARACTERES"),
});

const resetPasswordSchema = yup.object().shape({
  newPassword: yup.string().required("NOVA PALAVRA-PASSE OBRIGATÓRIA!"),
  newPasswordConfirmation: yup.string().when("newPassword", {
    is: (newPassword: any) => newPassword !== "",
    then: () =>
      yup
        .string()
        .required("POR FAVOR, CONFIRME A NOVA PALAVRA-PASSE.")
        .oneOf([yup.ref("newPassword")], "AS PALAVRAS-PASSE NÃO COINCIDEM."),
  }),
});

export {
  authenticationSchema,
  enterpriseClientSchema,
  privateClientSchema,
  clientDetailsSchema,
  createPrivateClientOrderOrderPartsSchema,
  createPrivateClientPaymentDataSchema,
  createPrivateClientShipmentSchema,
  createPrivateClientEmailSchema,
  createInvoiceSchema,
  updatePrivateClientOrderSchema,
  updateEnterpriseClientOrderSchema,
  updateEnterpriseInvoiceSchema,
  updatePrivateInvoiceSchema,
  createSupplierSchema,
  updateSupplierSchema,
  supplierDetailSchema,
  createSupplierOrderPartsSchema,
  createSupplierOrderArticlesSchema,
  createSupplierDetailsSchema,
  removeSupplierOrderPartsAndArticlesSchema,
  createStockDetailsSchema,
  createAccountingInvoiceSchema,
  createUserSchema,
  updateUserSchema,
  updateProfileSchema,
  resetPasswordEmailSchema,
  resetPasswordSchema,
};
