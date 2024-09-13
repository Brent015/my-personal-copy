import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, message, Steps } from "antd";
import { z } from "zod";
import EventDetailsSection from "./event-details";
import PackageDetailsSection from "./packages";
import PaymentAndDiscountsSection from "./payments";
import EventSummary from "./summary";
import { eventSchema, sampleEventData } from "./types";

const { Step } = Steps;

type EventFormData = z.infer<typeof eventSchema>;

const CreateEventForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    mode: "onChange",
    defaultValues: sampleEventData,
  });

  const [stepErrors, setStepErrors] = useState<Record<number, boolean>>({});

  // Use useCallback to memoize the updateStepErrors function
  const updateStepErrors = useCallback(() => {
    const newStepErrors = {
      0: !!(
        errors.eventName ||
        errors.eventImages ||
        errors.eventHighlights ||
        errors.eventLocation ||
        errors.distance
      ),
      1: !!errors.packages,
      2: !!(
        errors.requiredDownPayment ||
        errors.allowFullPayment ||
        errors.discounts
      ),
      3: false, // Summary step doesn't have its own fields to validate
    };
    setStepErrors(newStepErrors);
  }, [errors]);

  // Use useEffect to update step errors when errors change
  useEffect(() => {
    updateStepErrors();
  }, [updateStepErrors]);

  const onSubmit = (data: EventFormData) => {
    console.log(data);
    message.success("Event created successfully!");
    // Here you would typically send the data to your backend
  };

  const nextStep = async () => {
    const fieldsToValidate = [
      [
        "eventName",
        "eventImages",
        "eventHighlights",
        "eventLocation",
        "distance",
      ],
      ["packages"],
      ["requiredDownPayment", "allowFullPayment", "discounts"],
      [],
    ][currentStep];

    const isStepValid = await trigger(fieldsToValidate as never);
    if (isStepValid) {
      setCurrentStep(currentStep + 1);
    } else {
      message.error("Please fix the errors before proceeding.");
    }
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  const steps = [
    {
      title: "Event Details",
      content: <EventDetailsSection control={control} />,
    },
    { title: "Packages", content: <PackageDetailsSection control={control} /> },
    {
      title: "Payment & Discounts",
      content: <PaymentAndDiscountsSection control={control} />,
    },
    { title: "Summary", content: <EventSummary {...watch()} /> },
  ];

  return (
    <Card className="max-w-4xl mx-auto">
      <Form layout="vertical">
        <Steps current={currentStep}>
          {steps.map((item, index) => (
            <Step
              key={item.title}
              title={item.title}
              status={
                stepErrors[index]
                  ? "error"
                  : currentStep === index
                    ? "process"
                    : "wait"
              }
            />
          ))}
        </Steps>

        <div className="mt-8">{steps[currentStep]!.content}</div>

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && <Button onClick={prevStep}>Previous</Button>}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={nextStep}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              Create Event
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default CreateEventForm;
