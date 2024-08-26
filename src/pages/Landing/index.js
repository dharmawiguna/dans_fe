import React from "react";
import { Navbar } from "../../components/Navbar";
import { Container } from "../../components/Container";
import Header from "../../components/Header";
import JobList from "../../components/JobList";

export default function Landing() {
  return (
    <Container>
      <Navbar />
      <Header />
      <JobList />
    </Container>
  );
}
