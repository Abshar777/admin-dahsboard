import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface props {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open: boolean;
  closeFn: Function;
}

export function SheetReuse({
  title,
  description,
  children,
  footer,
  closeFn,
  open,
}: props) {
  return (
    <Sheet open={open} onOpenChange={(open) => !open && closeFn()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <SheetClose asChild>{footer}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
