import { InboxOutlined } from "@ant-design/icons";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { message, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import React from "react";
import "./styles.css";

const { Dragger } = Upload;

interface SortableImageUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  onPreview: (file: UploadFile) => void;
}

interface DraggableUploadListItemProps {
  originNode: React.ReactElement;
  file: UploadFile;
}

const DraggableUploadListItem: React.FC<DraggableUploadListItemProps> = ({
  originNode,
  file,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.uid,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "is-dragging" : ""}
      {...attributes}
      {...listeners}
    >
      {file.status === "error" && isDragging
        ? originNode.props.children
        : originNode}
    </div>
  );
};

const SortableImageUpload: React.FC<SortableImageUploadProps> = ({
  value = [],
  onChange,
  onPreview,
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = value.findIndex((item) => item.uid === active.id);
      const newIndex = value.findIndex((item) => item.uid === over?.id);
      const newFileList = arrayMove(value, oldIndex, newIndex);
      onChange?.(newFileList);
    }
  };

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    onChange?.(fileList);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <SortableContext
        items={value.map((file) => file.uid)}
        strategy={horizontalListSortingStrategy}
      >
        <Dragger
          listType="picture-card"
          multiple
          fileList={value}
          beforeUpload={(file) => {
            const isJpgOrPng =
              file.type === "image/jpeg" || file.type === "image/png";
            if (!isJpgOrPng) {
              message.error("You can only upload JPG/PNG files!");
            }
            return false; // Prevent auto upload
          }}
          onChange={handleChange}
          onPreview={onPreview}
          itemRender={(originNode, file) => (
            <DraggableUploadListItem originNode={originNode} file={file} />
          )}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </SortableContext>
    </DndContext>
  );
};

export default SortableImageUpload;
