import { useContext } from "react";
import { IdentityProviderContext } from "./hardhat/SymfoniContext";

export const useIdentityProvider = () => useContext(IdentityProviderContext)?.instance
