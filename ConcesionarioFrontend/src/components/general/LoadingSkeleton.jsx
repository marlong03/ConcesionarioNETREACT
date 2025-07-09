import { Skeleton, Stack } from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width="40%" height={20} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
    </Stack>
  );
}
