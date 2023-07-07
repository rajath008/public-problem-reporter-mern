import React, { useEffect, useState } from "react";
import {
  Spacer,
  Badge,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Stack,
  Divider,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { WarningTwoIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons";
import Problems from "./R_Problems_api";
import "./R_Problems.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../LoadingPage/LoadingPage";

const reported_problems = Problems;
//
//
//
//
//
//

const R_Problems = (props) => {
  const Port = "https://expensive-hem-elk.cyclic.app/";
  const port = "https://expensive-hem-elk.cyclic.app/";
  const [problems, setproblems] = useState([]);
  const [name, setname] = useState("");
  const [load, setload] = useState(true);
  let navigate = useNavigate();
  function solved(pid) {
    console.log("FUNCPID IS " + pid.toString());
    axios.get(Port + "/api/dept/solve/" + pid.toString()).then((result) => {
      console.log(result);
      window.location.reload();
    });

    // console.log("clicked");
  }
  function flag(pid) {
    console.log(pid);
    axios.post(Port + "/api/dept/flag", { pid: pid }).then((result) => {
      console.log(result);
      window.location.reload();
    });
  }
  useEffect(() => {
    axios
      .post(Port + "/api/dept/getdeptname", {
        did: localStorage.getItem("did"),
      })
      .then((result) => {
        console.log(result.data);
        setname(result.data);
      });
    // axios.get(port + "/api/dept/probs/" + name).then((response) => {
    axios
      .get(Port + "/api/reportprob/problems/" + name)
      .then((response) => {
        if (response.data.length == 0) {
          alert("Congrats no problems");
        }
        setproblems(response.data.reverse());
        console.log(response.data);
        setload(false);
      })
      .catch((err) => {
        console.log("error fetching data ");
      });
  }, [name]);
  return (
    <>
      {problems.map((currElem) => {
        return (
          <>
            <center>
              <Card
                maxW="sm"
                boxShadow="dark-lg"
                mb="7"
                bg='gray.300'
                cursor={"pointer"}
              >
                <CardBody>
                  <Image
                    src={currElem.imageurl}
                    alt="Image of the problem"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md" color="red.600">
                      {currElem.name}
                    </Heading>
                    <Text color="black">
                      <Badge colorScheme="blue">Date</Badge>:{" "}
                      {new Date(currElem.formatdate).toLocaleDateString(
                        "en-GB"
                      )}
                    </Text>

                    {/* <Text color='blue.600' fontSize='2xl'>
                                $450
                            </Text> */}
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      variant="solid"
                      colorScheme="green"
                      onClick={() => {
                        solved(currElem.pid);
                      }}
                    >
                      <CheckIcon mr="2" />
                      Solved
                    </Button>
                    <Button
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => {
                        navigate("/probdetails/" + currElem.pid);
                      }}
                    >
                      Full Details
                      <InfoIcon ml="2" />
                    </Button>
                    <Spacer />
                    <Button
                      onClick={() => {
                        flag(currElem.pid);
                      }}
                    >
                      <WarningTwoIcon color="red" />
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </center>
          </>
        );
      })}
    </>
  );
};

export default R_Problems;
