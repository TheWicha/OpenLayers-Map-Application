import React, { useState, FormEvent, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { useDispatch } from "react-redux";
import { updateWtk } from "@/src/redux/slices/wtkSlice";
import { cleanDrawings } from "@/src/redux/slices/cleanDrawingsSlice";
import Input from "./Input";

const GeometryCreationForm = () => {
  const [isFormLoading, setFormLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [wktValues, setWktValues] = useState<string[]>([]);
  const wtk = useSelector((state: RootState) => state.wtk);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (wtk.coordinates !== "")
      setWktValues((prev) => [...prev, wtk.coordinates]);
  }, [wtk.coordinates]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormLoading(true);
    setFormError(null);

    let formData = new FormData(event.currentTarget);
    formData.set("wtk", JSON.stringify(wktValues));

    if (wtk.coordinates.length === 0) {
      setFormLoading(false);
      return setFormError(
        "No shape has been selected. Please select a shape before submitting the form"
      );
    }

    try {
      const response = await fetch("api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
      const data = await response.json();
      alert(data.message);
      setWktValues([""]);
      dispatch(updateWtk({ coordinates: "" }));
      dispatch(cleanDrawings());
      formRef.current?.reset();
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
        console.error(error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
      className="flex flex-col border rounded-xl p-4 w-full"
    >
      <Input name="name" title="Name" type="text" />
      <Input name="creationDate" title="Date" type="date" />
      <Input
        title="WTK"
        name="WTK"
        type="textarea"
        disabled
        wtkValue={wktValues}
      />
      <div className="h-12 p-2">
        {formError && <p className=" text-red-500">{formError}</p>}
      </div>

      <input
        className="p-4 bg-green-400 w-36 self-center my-5 rounded-lg cursor-pointer"
        type="submit"
        value={isFormLoading ? "Loading..." : "Submit"}
        disabled={isFormLoading}
      />
    </form>
  );
};

export default GeometryCreationForm;
