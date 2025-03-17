import express from "express";
import mysql from "mysql2/promise";
const createUser = async (req, res, next) => {
  const { username, password, adminKey } = req.body;

  if (adminKey === sysAdminKey) {
  }
};
