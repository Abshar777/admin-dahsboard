import { Spinner } from "@heroui/spinner";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Loader from "../loader";
interface Props {
  isLoading: boolean;
  text: string;
  loadingText?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  spinner?: React.JSX.Element;
  disabled?: boolean;
  link?: string;
  onClick?: () => void;
}

const AnimatedButton = ({
  isLoading,
  text,
  loadingText = "Loading",
  color = "primary",
  size = "md",
  className,
  type = "button",
  disabled = false,
  onClick,
  link,
}: Props) => {
  return (
    <Button
      disabled={disabled}
      isLoading={isLoading}
      type={type}
      color={color}
      size={size}
      onPress={onClick}
      className={cn(className,
        "w-full font-semibold disabled:cursor-not-allowed disabled:opacity-50 active:scale-[.9] transition-all ease-in duration-[.3s]  px-0 rounded-[.8rem]",
        
      )}
      spinner={null}
    >
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <motion.p
            key="text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {link ? (
              <Link className="no-underline" href={link}>
                {text}
              </Link>
            ) : (
              text
            )}
          </motion.p>
        ) : (
          <motion.div
            key="loading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center gap-2"
          >
            {loadingText}
           <div className="scale-[.7]">
           <Loader/>
          
           </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default AnimatedButton;
