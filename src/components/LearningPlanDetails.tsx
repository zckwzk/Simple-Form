import React from "react";

interface LearningPlan {
  skillLevel: string;
  timePerWeek: number;
  learningStyles: string[];
  technologies: string[];
  goalTimeline: string;
  resourceType: string;
}

const LearningPlanDetails: React.FC<LearningPlan> = ({
  skillLevel,
  timePerWeek,
  learningStyles,
  technologies,
  goalTimeline,
  resourceType,
}) => {
  return (
    <div>
      <h2>Learning Plan Details</h2>
      <ul>
        <li>Skill Level: {skillLevel}</li>
        <li>Time Per Week: {timePerWeek}</li>
        <li>Learning Styles: {learningStyles.join(", ")}</li>
        <li>Technologies: {technologies.join(", ")}</li>
        <li>Goal Timeline: {goalTimeline}</li>
        <li>Resource Type: {resourceType}</li>
      </ul>
    </div>
  );
};

export default LearningPlanDetails;
