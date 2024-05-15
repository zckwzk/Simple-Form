import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { learningPlannerSchema } from "../types";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import LearningPlanDetails from "./LearningPlanDetails";

type IFormInput = z.infer<typeof learningPlannerSchema>;

const LearningPlannerForm: React.FC = () => {
  const [learningPlan, setLearningPlan] = useState(null);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: zodResolver(learningPlannerSchema) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      const responseData = await response.json();
      console.log(responseData); // Handle server response
      setLearningPlan(responseData.data);
      setSuccessSubmit(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
    // Handle the form data as needed
  };

  if (loading) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (successSubmit) {
    return (
      <LearningPlanDetails
        skillLevel={learningPlan.skillLevel}
        timePerWeek={learningPlan.timePerWeek}
        learningStyles={learningPlan.learningStyles}
        technologies={learningPlan.technologies}
        goalTimeline={learningPlan.goalTimeline}
        resourceType={learningPlan.resourceType}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl max-w-lg mx-auto animate-fadeIn">
      <h3 className="text-slate-900 dark:text-white text-base font-medium tracking-tight mb-6 text-center">
        Learning Web Development Journey Planner
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectInput
          label="Current Skill Level"
          options={[
            { value: "", label: "Select" },
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
          ]}
          error={errors.skillLevel?.message}
          register={register("skillLevel")}
        />

        <TextInput
          label="Available Time Per Week (hours)"
          type="number"
          error={errors.timePerWeek?.message}
          register={register("timePerWeek")}
        />

        <CheckboxGroup
          label="Preferred Learning Styles"
          options={[
            { value: "reading", label: "Reading" },
            { value: "videos", label: "Videos" },
            { value: "projects", label: "Hands-on Projects" },
          ]}
          error={errors.learningStyles?.message}
          register={register("learningStyles")}
        />

        <SelectInput
          label="Specific Technologies"
          options={[
            { value: "html", label: "HTML" },
            { value: "css", label: "CSS" },
            { value: "javascript", label: "JavaScript" },
            { value: "react", label: "React" },
            { value: "node", label: "Node.js" },
          ]}
          error={errors.technologies?.message}
          register={register("technologies")}
          multiple
        />

        <TextInput
          label="Goal Timeline"
          type="date"
          error={errors.goalTimeline?.message}
          register={register("goalTimeline")}
        />

        <RadioGroup
          label="Preferred Learning Resources"
          options={[
            { value: "free", label: "Free Resources" },
            { value: "paid", label: "Paid Courses" },
            { value: "bootcamp", label: "Bootcamps" },
          ]}
          error={errors.resourceType?.message}
          register={register("resourceType")}
        />

        <button
          type="submit"
          className="w-full mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 animate-fadeIn"
        >
          Generate Learning Plan
        </button>
      </form>
    </div>
  );
};

export default LearningPlannerForm;
