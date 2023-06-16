import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/cases/";

// Create new case
const createCase = async (caseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, caseData, config);

  if(response.data){
    toast.success("Case created successfully");
  }
  return response.data;
};

// Delete user case
const deleteCase = async (caseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + caseId, config);

  return response.data;
};

// Edit case
const editCase = async (caseId,caseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + caseId,caseData, config);

  return response.data;
};
// Get specific case
const getCase = async (id) => {
  const response = await axios.get(API_URL + 'case/' + id);
  return response.data;
}

// Get user cases
const getUserCases = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get all cases

const getAllCases = async () => {
  const response = await axios.get(API_URL + "all");
  return response.data;
};

const caseService = {
  createCase,
  getUserCases,
  getCase,
  getAllCases,
  deleteCase,
  editCase
};

export default caseService;
