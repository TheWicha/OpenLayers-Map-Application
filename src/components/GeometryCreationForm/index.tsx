import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormState, RootState, AppDispatch } from "@/src/redux/store";
import { useDispatch } from "react-redux";
import { resetForm, submitForm } from "@/src/redux/slices/formSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Input from "./Input";
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
  const dispatch: AppDispatch = useDispatch();
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

    dispatch(submitForm(form))
      .then((result) => unwrapResult(result).payload)
      .then((response) => {
        console.log(response, "response");

        setForm({
          name: "",
          creationDate: "",
          wkt: [],
        });

        dispatch(resetForm());
      })
      .catch((error: Error) =>
        console.error("Failed to submit the form: ", error.message)
      );
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
      <input
        className="p-4 bg-green-400 w-36 self-center my-5 rounded-lg cursor-pointer"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default GeometryCreationForm;
