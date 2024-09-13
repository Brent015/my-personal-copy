import {
  CalendarOutlined,
  CarOutlined,
  CopyOutlined,
  DeleteOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Collapse,
  CollapseProps,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Select,
  Space,
  Tooltip,
  message,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import ScheduleCalendarView from "../schedules-calendar";
import ScheduleSummaryView from "../schedules-summary";

const { RangePicker } = DatePicker;
const { Option } = Select;

// Sample data for coordinators
const sampleCoordinators = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
  { id: "4", name: "Sarah Williams" },
  { id: "5", name: "Chris Lee" },
];

// Sample data for vehicles
const sampleVehicles = [
  { id: "1", name: "Van - Toyota HiAce" },
  { id: "2", name: "Bus - Hyundai County" },
  { id: "3", name: "Car - Honda Civic" },
  { id: "4", name: "SUV - Ford Everest" },
  { id: "5", name: "Minibus - Mercedes-Benz Sprinter" },
];

interface CreateScheduleFormProps {
  onSubmit: (data: ScheduleFormData) => void;
  event: {
    id: string;
    name: string;
    image: string;
  };
}

const scheduleSchema = z.object({
  eventId: z.string(),
  schedules: z
    .array(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        maxGuests: z.number().min(1, "At least one guest is required"),
        coordinatorId: z.string().optional(),
        vehicleId: z.string().optional(),
      })
    )
    .refine((schedules) => {
      for (let i = 0; i < schedules.length; i++) {
        for (let j = i + 1; j < schedules.length; j++) {
          const scheduleI = schedules[i];
          const scheduleJ = schedules[j];
          if (scheduleI && scheduleJ) {
            if (
              (scheduleI.startDate <= scheduleJ.endDate &&
                scheduleJ.startDate <= scheduleI.endDate) ||
              (scheduleJ.startDate <= scheduleI.endDate &&
                scheduleI.startDate <= scheduleJ.endDate)
            ) {
              return false;
            }
          }
        }
      }
      return true;
    }, "Schedules cannot overlap"),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

const CreateScheduleForm: React.FC<CreateScheduleFormProps> = ({
  onSubmit,
  event,
}) => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      eventId: event?.id || "",
      schedules: [
        {
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate())),
          maxGuests: 1,
          coordinatorId: undefined,
          vehicleId: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const watchedSchedules = watch("schedules");

  const handleFormSubmit = async (data: ScheduleFormData) => {
    console.log("Form submitted with data:", data);
    const isValid = await trigger();
    if (isValid) {
      onSubmit(data);
    } else {
      setActiveKeys(fields.map((field) => field.id));
      message.error("Please correct the errors in the form.");
    }
  };

  const handleFormError = (errors: unknown) => {
    console.error("Form validation errors:", errors);
    setActiveKeys(fields.map((field) => field.id));
    message.error("Please correct the errors in the form.");
  };

  const duplicateSchedule = (index: number) => {
    const scheduleToClone = watchedSchedules[index];
    if (scheduleToClone) {
      append({
        startDate: new Date(scheduleToClone.startDate),
        endDate: new Date(scheduleToClone.endDate),
        maxGuests: scheduleToClone.maxGuests,
        coordinatorId: scheduleToClone.coordinatorId,
        vehicleId: scheduleToClone.vehicleId,
      });
      message.success("Schedule duplicated successfully");
    }
  };

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (start.year() !== end.year()) {
      return `${start.format("MMM D, YYYY")} - ${end.format("MMM D, YYYY")}`;
    } else if (start.month() !== end.month()) {
      return `${start.format("MMM D")} - ${end.format("MMM D, YYYY")}`;
    } else {
      return `${start.format("MMM D")} - ${end.format("D, YYYY")}`;
    }
  };

  const renderScheduleContent = (index: number) => (
    <Space direction="vertical" className="w-full" size="large">
      <Controller
        name={`schedules.${index}`}
        control={control}
        render={({ field }) => (
          <Form.Item
            label={
              <span className="flex items-center">
                <CalendarOutlined className="mr-2" /> Date Range
              </span>
            }
            validateStatus={
              errors.schedules?.[index]?.startDate ||
              errors.schedules?.[index]?.endDate ||
              errors.schedules
                ? "error"
                : ""
            }
            help={
              errors.schedules?.[index]?.startDate?.message ||
              errors.schedules?.[index]?.endDate?.message
            }
          >
            <RangePicker
              value={[dayjs(field.value.startDate), dayjs(field.value.endDate)]}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  field.onChange({
                    ...field.value,
                    startDate: dates[0].toDate(),
                    endDate: dates[1].toDate(),
                  });
                }
              }}
              className="w-full"
            />
          </Form.Item>
        )}
      />

      <Controller
        name={`schedules.${index}.maxGuests`}
        control={control}
        render={({ field }) => (
          <Form.Item
            label={
              <span className="flex items-center">
                <TeamOutlined className="mr-2" /> Max Guests
              </span>
            }
            validateStatus={errors.schedules?.[index]?.maxGuests ? "error" : ""}
            help={errors.schedules?.[index]?.maxGuests?.message}
          >
            <InputNumber {...field} min={1} className="w-full" />
          </Form.Item>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name={`schedules.${index}.coordinatorId`}
          control={control}
          render={({ field }) => (
            <Form.Item
              label={
                <span className="flex items-center">
                  <UserOutlined className="mr-2" /> Coordinator
                </span>
              }
            >
              <Select
                {...field}
                className="w-full"
                allowClear
                placeholder="Select a coordinator"
              >
                {sampleCoordinators.map((coordinator) => (
                  <Option key={coordinator.id} value={coordinator.id}>
                    {coordinator.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />

        <Controller
          name={`schedules.${index}.vehicleId`}
          control={control}
          render={({ field }) => (
            <Form.Item
              label={
                <span className="flex items-center">
                  <CarOutlined className="mr-2" /> Vehicle
                </span>
              }
            >
              <Select
                {...field}
                className="w-full"
                allowClear
                placeholder="Select a vehicle"
              >
                {sampleVehicles.map((vehicle) => (
                  <Option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />
      </div>
    </Space>
  );

  const collapseItems: CollapseProps["items"] = fields.map((field, index) => ({
    key: field.id,
    label: formatDateRange(
      watchedSchedules[index]?.startDate || new Date(),
      watchedSchedules[index]?.endDate || new Date()
    ),
    extra: (
      <Space>
        <Tooltip title="Duplicate Schedule">
          <Button
            size="small"
            icon={<CopyOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              duplicateSchedule(index);
            }}
          />
        </Tooltip>
        <Tooltip title="Delete Schedule">
          <Button
            size="small"
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              remove(index);
            }}
            danger
          />
        </Tooltip>
      </Space>
    ),
    children: renderScheduleContent(index),
  }));

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(handleFormSubmit, handleFormError)}
      className="max-w-4xl mx-auto"
    >
      <ScheduleSummaryView schedules={watchedSchedules} />
      <ScheduleCalendarView
        schedules={watchedSchedules}
        eventName={event.name}
      />

      <Collapse
        items={collapseItems}
        className="mb-6"
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(keys as string[])}
      />

      {errors.schedules && (
        <div className="text-red-500 mb-4">
          {errors.schedules.message || errors.schedules.root?.message}
        </div>
      )}

      <Divider />

      <Form.Item>
        <Button
          type="dashed"
          onClick={() =>
            append({
              startDate: new Date(),
              endDate: new Date(new Date().setDate(new Date().getDate())),
              maxGuests: 1,
              coordinatorId: undefined,
              vehicleId: undefined,
            })
          }
          block
          icon={<PlusOutlined />}
          className="h-16 text-lg"
        >
          Add Another Schedule
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Save Schedules
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateScheduleForm;
