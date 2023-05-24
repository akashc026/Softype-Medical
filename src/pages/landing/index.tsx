/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Container,
  createStyles,
  CSSObject,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Footer } from '../../components/Footer';
import DoctorImage from '../../img/landingPage/best-health-insurance-plans_1-sixteen_nine.png';
import EngineeringImage from '../../img/landingPage/health-insurance-concept-doctor-hospital-260nw-1451879171.png';
import LabImage from '../../img/landingPage/engineering.jpg';
import WorkingEnvironmentImage from '../../img/landingPage/Does-your-health-insurance-cover-mental-health-services.png';
import { Header } from './Header';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const heroImageStyles: CSSObject = {
  position: 'absolute',
  borderRadius: '50%',
  objectFit: 'cover',
};

const useStyles = createStyles((theme) => ({
  outer: {
    overflow: 'hidden',
    backgroundImage: `radial-gradient(640px at top left, ${theme.fn.lighten(theme.fn.primaryColor(), 0.92)}, white)`,
  },

  inner: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '6rem',
    paddingBottom: '6rem',
    marginTop: '6rem',
    marginBottom: '6rem',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  content: {
    maxWidth: 480,
    marginRight: '4.5rem',
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 56,
    lineHeight: 1.2,
    fontWeight: 600,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  highlight: {
    color: theme.fn.primaryColor(),
  },

  heroImage1: {
    ...heroImageStyles,
    top: 192,
    right: 24,
    width: 384,
    height: 384,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  heroImage2: {
    ...heroImageStyles,
    top: 415,
    left: 435,
    width: 288,
    height: 288,

    [theme.fn.smallerThan('md')]: {
      position: 'static',
    },
  },

  heroImage3: {
    ...heroImageStyles,
    top: 0,
    right: -128,
    width: 448,
    height: 448,
  },



  
  heroButton: {
    marginTop: '2.25rem',

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  heroTitle: {
    color: theme.white,
    fontSize: 50,
    fontWeight: 500,
    lineHeight: 1.2,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 30,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  heroContainer: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingTop: '4.5rem',
    paddingBottom: '6rem',
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      paddingTop: '3rem',
      paddingBottom: '4.5rem',
    },
  },









  heroImage4: {
    ...heroImageStyles,
    top: -48,
    left: -432,
    width: 864,
    height: 785,

    [theme.fn.smallerThan('md')]: {
      position: 'static',
      width: 288,
      height: 288,
    },
  },

  featureSection: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },

  featureBox: {
    backgroundColor: theme.fn.lighten(theme.fn.primaryColor(), 0.9),
    borderRadius: theme.radius.xl,
    padding: '2.25rem',
    width: 512,
  },

  featureTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: theme.spacing.md,
  },

  featureDescription: {
    fontSize: 18,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  },
}));

const features = [
  {
    title: 'Comprehsive Care Plans',
  },
  {
    title: 'No hidden fees',
  },
  {
    title: '24/7 Messaging'
  },
  {
    title: 'Clinically rigorous',
  },
];

export function LandingPage(): JSX.Element {

  const navigate = useNavigate();
  const theme = useMantineTheme();
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const { classes, cx } = useStyles();
  return (
    <div className={classes.outer}>
      <Header />

      <br></br>

      <div style={{ backgroundSize: "cover", backgroundPosition: 'center', position: 'relative' }}>

        <Carousel mx="auto" withIndicators height={600}
          plugins={[autoplay.current]}>
          <Carousel.Slide style={{ width: '100%' }}><div style={{ display: 'grid', justifyItems: 'center', alignItems: 'center', width: 'auto', height: '100%', backgroundImage: `url(${WorkingEnvironmentImage})`, backgroundSize: '100% 100%' }} >
            <Container className={classes.heroContainer}>
              <Title className={classes.heroTitle}>
                Book Appointment,<br /> Quickly with our Professional Doctors.
              </Title>
              <Button size="xl" radius="xl" className={classes.heroButton} onClick={() => navigate('/signin')}>
                Get Started
              </Button>
            </Container>
          </div></Carousel.Slide>
          <Carousel.Slide style={{ width: '100%' }}><div style={{ display: 'grid', justifyItems: 'center', alignItems: 'center', width: 'auto', height: '100%', backgroundImage: `url(${DoctorImage})`, backgroundSize: ' 100% 100%' }} >
          <Container className={classes.heroContainer}>
              <Title className={classes.heroTitle}>
                More Care plans,<br />& Chat with our Doctors one to one.
              </Title>
              <Button size="xl" radius="xl" className={classes.heroButton} onClick={() => navigate('/signin')}>
                Get Started
              </Button>
            </Container>
            </div></Carousel.Slide>
          <Carousel.Slide style={{ width: '100%' }}><div style={{ display: 'grid', justifyItems: 'center', alignItems: 'center', width: 'auto', height: '100%', backgroundImage: `url(${EngineeringImage})`, backgroundSize: ' 100% 100%' }} >
          <Container className={classes.heroContainer}>
              <Title className={classes.heroTitle}>
                Check Health Record,<br />& Medications,Vaccines..etc all in one place.
              </Title>
              <Button size="xl" radius="xl" className={classes.heroButton} onClick={() => navigate('/signin')}>
                Get Started
              </Button>
            </Container>
            </div></Carousel.Slide>
          {/* ...other slides */}
        </Carousel>

      </div>

      <Container>
        <div className={cx(classes.inner, classes.featureSection)}>
          <Stack align="flex-end">
            {features.map((feature, index) => (
              <Box key={`feature-${index}`} className={classes.featureBox}>
                <Text className={classes.featureTitle}>{feature.title}</Text>
              </Box>
            ))}
          </Stack>
          <img className={classes.heroImage4} src={LabImage} alt="Laboratory" />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
