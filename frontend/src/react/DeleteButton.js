import React from "react";
import { Button } from "bloomer/lib/elements/Button";
import { Icon } from "bloomer/lib/elements/Icon";

export const DeleteButton = ({ children, ...props }) => (
  <Button isColor="danger" {...props}>
    <Icon className="fas fa-times" />
    {children}
  </Button>
);
