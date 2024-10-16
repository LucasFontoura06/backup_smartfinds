import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertTitle } from "@mui/material";
import { useState, useEffect } from "react";

interface CustomAlertProps {
  severity: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
  duration?: number;  
}

const CustomAlerts: React.FC<CustomAlertProps> = ({ severity, title, message, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);  
    }, duration);

    return () => clearTimeout(timer);  
  }, [duration]);

  return (
    <AnimatePresence> 
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}  
          animate={{ opacity: 1, y: 0 }}    
          exit={{ opacity: 0, y: 100 }}     
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 1,
            exit: { duration: 1.5, ease: "easeInOut" } 
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
          }}
        >
          <Alert
            severity={severity}
            sx={{
              backgroundColor: severity === "success"
                ? "#d4edda"
                : severity === "error"
                ? "#f28b82"
                : undefined,
              color: severity === "success" || severity === "error" ? "#000" : undefined,
            }}
          >
            <AlertTitle>{title}</AlertTitle>
            {message}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlerts;





// Como usar:

// const ExampleUsage = () => {
//     return (
//       <div>
//         <CustomAlert
//           severity="success"
//           title="Success"
//           message="This is a success Alert with an encouraging title."
//         />
//         <CustomAlert
//           severity="info"
//           title="Info"
//           message="This is an info Alert with an informative title."
//         />
//         <CustomAlert
//           severity="warning"
//           title="Warning"
//           message="This is a warning Alert with a cautious title."
//         />
//         <CustomAlert
//           severity="error"
//           title="Error"
//           message="This is an error Alert with a scary title."
//         />
//       </div>
//     );
//   };