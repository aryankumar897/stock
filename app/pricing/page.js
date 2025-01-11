"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Switch,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";

import StarIcon from "@mui/icons-material/Star";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { motion } from "framer-motion";
import { FormControlLabel } from "@mui/material";
const StyledCard = styled(Card)(({ theme, variant }) => ({
  maxWidth: 500,
  backgroundColor: "#141414",

  color: "#ffffff",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1.5),
  position: "relative",
  borderColor: variant === "highlighted" ? "#0A84FF" : "#1e1e1e",
  transition: "background-color 0.3s, color 0.3s",
  "&:hover": {
    backgroundColor: "blue",
    color: "#ffffff",
    "& .MuiTypography-root": {
      color: "#ffffff",
    },
    "& .MuiButton-root": {
      backgroundColor: "#ffffff",
      color: "#0A84FF",
    },
    "& .MuiIconButton-root": {
      color: "#ffffff",
    },
  },
}));

const PriceText = styled(Typography)({
  fontSize: "30px",
  fontWeight: "bold",
});

const PlanTitle = styled(Typography)({
  fontSize: "22px",
  color: "#C7C7C7",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const FeatureText = styled(Typography)({
  fontSize: "16px",
  color: "#A6A6A6",
});

const ButtonStyled = styled(Button)({
  backgroundColor: "blue",
  color: "#fff",
  borderRadius: 20,
  marginTop: 16,
  padding: "10px 24px",
  "&:hover": {
    backgroundColor: "#0077E4",
  },
});

// Background and styling
const BackgroundBox = styled(Box)({
  backgroundImage: 'url("/images/pos1.png")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  padding: "4rem 2rem",
  textAlign: "center",
  color: "#fff",
  overflow: "hidden",
});

const PricingCard = ({
  title,
  price,
  features,
  buttonLabel,
  variant,
  icon,
  billingPeriod,
  handleCheckout,
}) => (
  <StyledCard variant={variant}>
    <CardContent>
      <PlanTitle variant="h6">
        <IconButton size="small" sx={{ color: "yellow" }}>
          {icon}
        </IconButton>
        {title}
      </PlanTitle>
      <PriceText>{price}</PriceText>
      <Box
        mt={2}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          color: "#fff",
          fontSize: "16px",
        }}
      >
        {features.map((feature, index) => (
          <FeatureText
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "500",
              color: "#fff",
            }}
          >
            ✓ {feature}
          </FeatureText>
        ))}
      </Box>

      <ButtonStyled 
      onClick={() => handleCheckout(billingPeriod, price)}
      
      >
        {buttonLabel}
      </ButtonStyled>
    </CardContent>
  </StyledCard>
);

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleToggle = () => setIsAnnual(!isAnnual);

  const handleCheckout = async (billingPeriod, price) => {
    console.log({ billingPeriod, price });

    const response = await fetch(`${process.env.API}/user/pricing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        billingPeriod,
        price: isAnnual ? price * 10 : price, // Assuming annual is 10x of monthly for demonstration
      }),
    });

    const data = await response.json();
    if (data?.err) {
      console.error("Stripe Checkout Error:", data?.err);
    } else {
      window.location.href = data.id;
    }
  };

  return (
    <BackgroundBox>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: '#121212',
          minHeight: "100vh",
          padding: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#ffffff",
            m: 11,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                display: "inline-block",
                padding: "0.3rem 1rem",
                borderRadius: "20px",
                background: "blue",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
                textTransform: "uppercase",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                transition: "background 0.3s ease",
                "&:hover": {
                  background: "blue",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Typography variant="body1">Bill Monthly</Typography>
            </Box>
          </motion.div>

          <Switch checked={isAnnual} onChange={handleToggle} color="warning" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                display: "inline-block",
                padding: "0.3rem 1rem",
                borderRadius: "20px",
                background: "blue",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
                textTransform: "uppercase",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                transition: "background 0.3s ease",
                "&:hover": {
                  background: "blue",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Typography variant="body1">Annual</Typography>
            </Box>
          </motion.div>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <PricingCard
            title="Purchase 1 Report"
            price={isAnnual ? "290 USD/year" : "29 USD"}
            features={["One-off report", "Lorem ipsum dolor sit"]}
            buttonLabel="Purchase"
            icon={<AssessmentIcon />}
            billingPeriod={isAnnual ? "annual" : "monthly"}
            handleCheckout={handleCheckout}
          />
          <PricingCard
            title="Starter Plan"
            price={isAnnual ? "190 USD/year" : "19 USD/mo"}
            features={
              isAnnual
                ? [
                    "AI insights and reorder alerts",
                    "Custom dashboards with analytics",
                    "Priority customer support",
                    "Advanced inventory categorization",
                  ]
                : [
                    "Basic inventory tools",
                    "Real-time stock updates",
                    "User and admin roles",
                  ]
            }
            buttonLabel="Get Started"
            variant="highlighted"
            icon={<FlashOnIcon />}
            billingPeriod={isAnnual ? "annual" : "monthly"}
            handleCheckout={handleCheckout}
          />

          <PricingCard
            title="Agency Plan"
            price={isAnnual ? "990 USD/year" : "99 USD/mo"}
            features={
              isAnnual
                ? [
                    "AI insights and reorder alerts",
                    "Custom dashboards with analytics",
                    "Priority customer support",
                    "Advanced inventory categorization",
                    "Enhanced security features",
                  ]
                : [
                    "Basic inventory tools",
                    "Real-time stock updates",
                    "User and admin roles",
                  ]
            }
            buttonLabel="Get Started"
            icon={<StarIcon />}
            billingPeriod={isAnnual ? "annual" : "monthly"}
            handleCheckout={handleCheckout}
          />
        </Box>
      </Box>
    </BackgroundBox>
  );
};

export default Pricing;
