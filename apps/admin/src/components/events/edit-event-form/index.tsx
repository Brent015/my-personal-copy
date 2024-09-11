import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Affix, Breadcrumb, Card, Form, Menu, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import EventDetailsSection from "../create-event-form/event-details";
import PackageDetailsSection from "../create-event-form/packages";
import PaymentAndDiscountsSection from "../create-event-form/payments";
import {
  EventFormData,
  eventSchema,
  sampleEventData,
} from "../create-event-form/types";
import EventFormHeader from "../event-form-header";

const EditEventForm: React.FC<{ initialData: EventFormData }> = ({
  initialData,
}) => {
  const [activeSection, setActiveSection] = useState("eventDetails");
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: sampleEventData,
    mode: "onChange",
  });

  // Create refs for each section
  const eventDetailsRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const paymentAndDiscountsRef = useRef<HTMLDivElement>(null);

  const onSubmit = (data: EventFormData) => {
    console.log(data);
    message.success("Changes saved successfully!");
  };

  const scrollToSection = (key: string) => {
    setActiveSection(key);
    const ref = {
      eventDetails: eventDetailsRef,
      packages: packagesRef,
      paymentAndDiscounts: paymentAndDiscountsRef,
    }[key];

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    [eventDetailsRef, packagesRef, paymentAndDiscountsRef].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Breadcrumb
        className="ml-4 mb-4 text-md"
        items={[
          {
            title: <Link to="/dashboard/events">Events</Link>,
          },
          {
            title: (
              <Link to="/dashboard/events/$eventId" params={{ eventId: "1" }}>
                Bali Adventure Retreat
              </Link>
            ),
          },
          {
            title: (
              <Link
                to="/dashboard/events/$eventId/edit"
                params={{ eventId: "1" }}
                className="text-slate-800"
              >
                Edit Event
              </Link>
            ),
          },
        ]}
      />
      <div className="flex">
        <Affix className="w-64">
          <Menu
            className="border-none"
            mode="inline"
            selectedKeys={[activeSection]}
            onClick={({ key }) => scrollToSection(key as string)}
          >
            <Menu.Item key="eventDetails">Event Details</Menu.Item>
            <Menu.Item key="packages">Packages</Menu.Item>
            <Menu.Item key="paymentAndDiscounts">Payment & Discounts</Menu.Item>
          </Menu>
        </Affix>

        <div className="flex-1 ml-8">
          <Affix>
            <EventFormHeader
              eventName="Bali Adventure Retreat"
              onBack={() => {}}
              onSave={function (): void {
                throw new Error("Function not implemented.");
              }}
              onReset={function (): void {
                throw new Error("Function not implemented.");
              }}
              isDirty={false}
            />
          </Affix>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <div ref={eventDetailsRef} id="eventDetails">
              <Card
                title="Event Details"
                className="mb-8 shadow-md"
                extra={
                  dirtyFields.eventName && (
                    <span className="text-blue-500">Modified</span>
                  )
                }
              >
                <EventDetailsSection control={control} />
              </Card>
            </div>

            <div ref={packagesRef} id="packages">
              <Card
                title="Packages"
                className="mb-8 shadow-md"
                extra={
                  dirtyFields.packages && (
                    <span className="text-blue-500">Modified</span>
                  )
                }
              >
                <PackageDetailsSection control={control} />
              </Card>
            </div>

            <div ref={paymentAndDiscountsRef} id="paymentAndDiscounts">
              <Card
                className="mb-8 shadow-md"
                title="Payment & Discounts"
                extra={
                  (dirtyFields.requiredDownPayment ||
                    dirtyFields.allowFullPayment ||
                    dirtyFields.discounts) && (
                    <span className="text-blue-500">Modified</span>
                  )
                }
              >
                <PaymentAndDiscountsSection control={control} />
              </Card>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditEventForm;
