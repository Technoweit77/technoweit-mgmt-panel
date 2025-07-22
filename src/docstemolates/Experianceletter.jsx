import React from "react";
import {
  Document,
  Page,
  Image,
  Text,
  StyleSheet,
  View,
  Link,
  Font,
} from "@react-pdf/renderer";
import logo from "../assets/Images/logo.png";
import stamp from "../assets/Images/logo2.png";
import top from "../assets/Images/top.png";
import bottom from "../assets/Images/bottom.png";

import TimeRomanFont from "../assets/fonts/times.ttf";
import TimeRomanBold from "../assets/fonts/times-Bold.ttf";


Font.register({ family: "Times-Roman", src: TimeRomanFont });
Font.register({ family: "Times-Bold", src: TimeRomanBold });



const styles = StyleSheet.create({

  top: {
    flex: 0.2,
  },
  top_img: {
    height: 100,
    width: 600,
  },
  page: {
    padding: 45,
    fontSize: 15,
    flex: 0.7,
  },

  container: {
    flex: 1,
    // fontFamily:"Times New Roman",
    fontFamily: "Times-Roman",
  },
  logo: {
    marginTop: 25,
    height: 70,
    width: 180,
    marginLeft: 25,
  },
  cdate: {
    marginLeft: 370,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  firstLineIndent: {
    textIndent: "35px",
  },
  letter: {
    marginTop: "10px",
    textAlign: "center",
    fontFamily: "Times-Bold",
  },
  name: {
    fontWeight: "bold",
  },
  content: {
    textAlign: "justify",
  },
  signature: {
    marginTop: 70,
  },
  stamp: {
    height: 105,
    width: 105,
  },
  address: {
    flex: 0.1,
    position: "absolute",
    bottom: 30,
    left: 45,
    right: 45,
    fontSize: 14,
    textAlign: "center",
  },
});

const Experianceletter = ({ data }) => {
  let studentData = data;

  return (
    <Document>
      <Page size="A4">

        <View style={styles.container}>
          <View style={styles.top}>
            <Image src={top} style={styles.top_img} />
            <Image style={styles.logo} src={logo} />
          </View>
          <View style={styles.page}>
            <View>
              <Text style={styles.cdate}> Date : 10/07/2025</Text>
              {/* 18-01-2024   */}

            </View>
            <View>
              <Text style={styles.letter}> EXPERIENCE CERTIFICATE </Text>
              <Text style={styles.letter}> TO WHOMSOEVER MAY CONCERN</Text>
            </View>

            <View style={styles.header}>
              <Text style={styles.name}>
                Dear: {"Mr."} {studentData.FName} {studentData.MName} {studentData.LName},
              </Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.firstLineIndent}>
                This is to certify that Mr. {studentData.FName} {studentData.MName} {studentData.LName}  was working full time in our organization
                as a "Full Stack Web Developer” for a period from
                May 2024 to 30 June 2025.
              </Text>

              <Text style={styles.firstLineIndent}>
                He was one of the hard working and efficient employee of
                our organization and provides his best
                service to the organization during its job tenure.
              </Text>

              <Text style={styles.firstLineIndent}>
                We wish him all the best for his future endeavors.
              </Text>

              {/* 22-01-2024   */}
            </View>
            <View style={styles.signature}>
              <Text>For Technoweit,</Text>
              <Image style={styles.stamp} src={stamp} />
              <Text>Mr. Vatsalya U. Bendale</Text>
              <Text>Co-Founder</Text>
            </View>
          </View>
          <View style={styles.address}>
            <Image style={styles.bottom} src={bottom} />

            <Text>
              Plot No 9, Anant Housing Society, Opposite M J College, Near Nipun Pathology, Jalgaon (MS) 425001
            </Text>
            <Text>+91 8888813277 +91 7620979777</Text>
            <Text>
              Email Id:{" "}
              <Link src="mailto:info@technoweit.com">
                {" "}
                info@technoweit.com
              </Link>
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

};

export default Experianceletter;