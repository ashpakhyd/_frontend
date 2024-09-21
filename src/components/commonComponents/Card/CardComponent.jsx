import { Card, CardBody } from "@nextui-org/react";

export default function CardComponent({ children, className }) {
  return (
    <div className={`flex justify-center items-center ${className}`} > 
      <Card radius="sm" className={className}>
        <CardBody className="">{children}</CardBody>
      </Card>
    </div>
  );
}
