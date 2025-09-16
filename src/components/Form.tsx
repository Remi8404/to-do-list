import { useAppDispatch } from "../hooks/hook";
import { add } from "../stores/toDoSlice";
import { type IChangeEvent } from "@rjsf/core";
import Form from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv8";
import { type RJSFSchema, type UiSchema } from "@rjsf/utils";
import { useState } from "react";
import AddressSearchWidget from "./AddressSearchWidget";

export type Inputs = {
  name: string;
  description: string;
  limitDate: string;
  isDone: boolean;
  otherInfo: string[];
  lat: number;
  lng: number;
  address: string;
};

const schema: RJSFSchema = {
  title: "Create a new Task",
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
      title: "Title",
      minLength: 1,
    },
    description: {
      type: "string",
      title: "Description",
    },
    limitDate: { type: "string", title: "Expiration Date", default: "" },
    isDone: { type: "boolean", title: "Done?", default: false },
    otherInfo: {
      title: "Other Informations",
      type: "array",
      items: {
        type: "string",
        title: "Other info",
      },
    },
    lat: {
      title: "Latitude",
      type: "number",
      default: 0,
    },
    lng: {
      title: "Longitude",
      type: "number",
      default: 0,
    },
    address: {
      title: "Adresse",
      type: "string",
    },
  },
};

const uiSchema: UiSchema = {
  name: {
    "ui:widget": "text",
  },
  description: {
    "ui:widget": "textarea",
  },
  limitDate: {
    "ui:widget": "date",
  },
  isDone: {
    "ui:widget": "checkbox",
  },
  otherInfo: {
    "ui:options": {
      orderable: false,
    },
  },
  address: {
    "ui:widget": "addressSearch",
  },
  lat: {
    "ui:widget": "hidden",
  },
  lng: {
    "ui:widget": "hidden",
  },
};

const widgets = {
  addressSearch: AddressSearchWidget,
};

export default function AddForm({
  setShowForm,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");

  const dispatch = useAppDispatch();

  // Keep track of the current form data, including address, lat, and lng
  const [formData, setFormData] = useState<Inputs>({
    name: "",
    description: "",
    limitDate: "",
    isDone: false,
    otherInfo: [],
    lat: lat,
    lng: long,
    address: selectedAddress,
  });

  const onSubmit = (e: IChangeEvent<any, RJSFSchema, any>) => {
    e.formData.lat = lat;
    e.formData.lng = long;
    e.formData.address = selectedAddress;
    dispatch(add(e.formData as Inputs));
    setShowForm(false);
  };

  return (
    <Form
      id="AddForm"
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      onSubmit={onSubmit}
      widgets={widgets}
      formContext={{ setLat, setLong, setSelectedAddress }}
      formData={formData}
      onChange={(form) => {
        setFormData(form.formData);
      }}
    >
      <button className="chakra-button css-4xx2wk" type="submit">
        valider
      </button>
    </Form>
  );
}
