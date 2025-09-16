import { useAppDispatch } from "../hooks/hook";
import { add, update, type IToDo } from "../stores/toDoSlice";
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
  title: "Your Task",
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

export default function TaskForm({
  setShowForm,
  type = "add",
  todoValue,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  type: "add" | "update";
  todoValue: Partial<IToDo>;
}) {
  const dispatch = useAppDispatch();

  // Keep track of the current form data, including address, lat, and lng
  const [formData, setFormData] = useState<Inputs>({
    name: todoValue.name ? todoValue.name : "",
    description: todoValue.description ? todoValue.description : "",
    limitDate: todoValue.limitDate ? todoValue.limitDate : "",
    isDone: todoValue.isDone ? todoValue.isDone : false,
    otherInfo: todoValue.otherInfo ? todoValue.otherInfo : [],
    lat: todoValue.lat ? todoValue.lat : 0,
    lng: todoValue.lng ? todoValue.lng : 0,
    address: todoValue.address ? todoValue.address : "",
  });
  const [lat, setLat] = useState(formData.lat);
  const [long, setLong] = useState(formData.lng);
  const [selectedAddress, setSelectedAddress] = useState(formData.address);

  const onSubmit = (e: IChangeEvent<any, RJSFSchema, any>) => {
    e.formData.lat = lat;
    e.formData.lng = long;
    e.formData.address = selectedAddress;
    if (type === "add") {
      dispatch(add(e.formData as Inputs));
    } else {
      dispatch(update({ ...(e.formData as Inputs), id: todoValue.id }));
    }
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
