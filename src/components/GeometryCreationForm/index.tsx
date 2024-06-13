import React, { useState } from "react";
import Input from "./Input";

const GeometryCreationForm = () => {
  const [form, setForm] = useState({
    name: "",
    creationDate: "",
    wkt: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setForm({
      name: "",
      creationDate: "",
      wkt: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border rounded-xl p-4"
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
        type="text"
        value={form.wkt}
        disabled
        setVal={handleChange}
      />

      <input
        className="p-4 bg-green-400 w-36 self-center my-5 rounded-lg"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default GeometryCreationForm;
