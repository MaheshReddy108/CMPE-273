
import React from "react";
import { storiesOf } from "@storybook/react";

import { Grommet, Box, Menu, Text } from "grommet";
import { grommet } from "grommet/themes";
import { FormDown } from "grommet-icons";

const CustomMenu = () => (
  <Grommet theme={grommet}>
    <Box
      align="center"
      // pad="large"
      background={{ color: "grey", opacity: 0.7 }}
    >
      <Menu
        plain
        items={[
          { label: "Past Orders", onClick: () => {} },
          { label: "Upcoming Orders", onClick: () => {} },
          { label: "Profile", onClick: () => {} }

        ]}
      >
        {({ drop, hover }) => {
          const color = hover && !drop ? "dark-2" : undefined;
          return (
            <Box
              direction="row"
              gap="small"
              pad="small"
              background={hover && drop ? "dark-2" : undefined}
            >
              <Text color={color}>Your account</Text>
              <FormDown color={color} />
            </Box>
          );
        }}
      </Menu>
    </Box>
  </Grommet>
);

storiesOf("Menu", module).add("Custom", () => <CustomMenu />);
export default CustomMenu;