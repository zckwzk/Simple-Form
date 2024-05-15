import { FieldError, UseFormRegister } from "react-hook-form";

import { z, ZodType } from "zod"; // Add new import

export type FormData = {
  name: string;
  email: string;
  timePerWeek: number;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "name" | "email" | "timePerWeek";

const validSkillLevels = ["beginner", "intermediate", "advanced"] as const;

const validResourceTypes = ["free", "paid", "bootcamp"] as const;

export const learningPlannerSchema = z.object({
  skillLevel: z
    .string()
    .refine((val) => val !== "", { message: "Skill level is required" })
    .refine(
      (val) =>
        validSkillLevels.includes(val as (typeof validSkillLevels)[number]),
      { message: "Invalid skill level" },
    ),

  timePerWeek: z.coerce
    .number({
      required_error: "required field",
      invalid_type_error: "Years of Experience is required",
    })
    .min(1, "Minimum 1 hour required")
    .max(24 * 7, `Maximum ${24 * 7} hours allowed`),
  learningStyles: z
    .array(
      z
        .string()
        .refine((val) => val !== "", { message: "Learning Style is required" }),
      { invalid_type_error: "Select at least one learning style" },
    )
    .min(1, { message: "Select at least one learning style" }),
  technologies: z
    .array(z.string())
    .min(1, { message: "Select at least one technology" }),
  goalTimeline: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Goal timeline is required")
    .refine(
      (val) => {
        const today = new Date();
        const selectedDate = new Date(val);
        return selectedDate > today;
      },
      { message: "Goal timeline must be after today" },
    ),
  resourceType: z
    .string({ invalid_type_error: "Select a resource type" })
    .refine((val) => val !== "" || val !== null, {
      message: "Select a resource type",
    })
    .refine(
      (val) =>
        validResourceTypes.includes(val as (typeof validResourceTypes)[number]),
      { message: "Invalid resource type" },
    ),
});
