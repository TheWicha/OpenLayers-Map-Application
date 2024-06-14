import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { useDispatch } from "react-redux";
import { resetForm, submitForm } from "@/src/redux/slices/formSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { updateWtk } from "@/src/redux/slices/wtkSlice";
import { cleanDrawings } from "@/src/redux/slices/cleanDrawingsSlice";
import Input from "./Input";
const GeometryCreationForm = () => {
  const [error, setError] = useState("");
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
    if (wtk.coordinates.length > 0) {
      setError("");
    }
  }, [wtk]);

  const handleChange = (name: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (form.wkt.length === 0) {
      return setError(
        "No shape has been selected. Please select a shape before submitting the form"
      );
    }

    try {
      const result = await dispatch(submitForm(form));
      const response = unwrapResult(result).payload;

      console.log(response, "response");

      setForm({
        name: "",
        creationDate: "",
        wkt: [],
      });

      dispatch(resetForm());
      dispatch(updateWtk({ coordinates: "" }));
      dispatch(cleanDrawings());
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to submit the form: ", error.message);
      } else {
        console.error("An unexpected error occurred: ", error);
      }
    }
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
        type="textarea"
        value={form.wkt}
        setVal={handleChange}
        disabled
      />
      <div className="h-12 p-2">
        {error && <p className=" text-red-500">{error}</p>}
      </div>

      <input
        className="p-4 bg-green-400 w-36 self-center my-5 rounded-lg cursor-pointer"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default GeometryCreationForm;
