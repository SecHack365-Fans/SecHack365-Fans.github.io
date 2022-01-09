import { VFC } from "react";
import Link from "next/link";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Navigator: VFC = () => {
  return (
    <Stack spacing={1} direction="row">
      <Link href="/">
        <Button variant="text">Top</Button>
      </Link>
      <Link href="/">
        <Button variant="text">参加記</Button>
      </Link>
    </Stack>
  );
};

export default Navigator;
