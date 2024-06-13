import React, { useState, useEffect } from "react";
import Input from "./Input";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

const GeometryCreationForm = () => {
  const [form, setForm] = useState<{
    name: string;
    creationDate: string;
    wkt: string[];
  }>({
    name: "",
    creationDate: "",
    wkt: [],
  });

  const wtk = useSelector((state: RootState) => state.wtk);

  useEffect(() => {
    if (wtk.coordinates !== "") {
      setForm((prevForm) => ({
        ...prevForm,
        wkt: [...form.wkt, wtk.coordinates],
      }));
    }
  }, [wtk]);

  const handleChange = (name: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setForm({
      name: "",
      creationDate: "",
      wkt: [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border rounded-xl p-4 w-full"
    >
      <Input
        name="name"
        title="Name"
        type="text"
        value={form.name}
        setVal={handleChange}
      />
      <Input
        name="creationDate"
        title="Date"
        type="date"
        value={form.creationDate}
        setVal={handleChange}
      />
      <Input
        title="WTK"
        name="WTK"
        type="textbox"
        value={form.wkt}
        setVal={handleChange}
        disabled
      />
      {console.log(form.wkt)}
      <input
        className="p-4 bg-green-400 w-36 self-center my-5 rounded-lg"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default GeometryCreationForm;
