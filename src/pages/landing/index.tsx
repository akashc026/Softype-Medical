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
import DoctorImage from '../../img/landingPage/doctor.jpg';
import EngineeringImage from '../../img/landingPage/engineering.jpg';
import LabImage from '../../img/landingPage/laboratory.jpg';
import WorkingEnvironmentImage from '../../img/landingPage/working-environment.jpg';
import { Header } from './Header';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
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

  heroImage4: {
    ...heroImageStyles,
    top: -48,
    left: -432,
    width: 864,
    height: 864,

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
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    title: 'No hidden fees',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    title: '24/7 Messaging',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    title: 'Clinically rigorous',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
];

export function LandingPage(): JSX.Element {
  const theme = useMantineTheme();
const autoplay = useRef(Autoplay({ delay: 2000 }));

  const { classes, cx } = useStyles();
  return (
    <div className={classes.outer}>
      <Header />

      <br></br>
      <Container size='xl'>
      <Carousel mx="auto" withIndicators height={600}
            plugins={[autoplay.current]}>
            <Carousel.Slide style={{width:'100%'}}><div style={{display:'grid',justifyItems:'center',alignItems:'center',width:'auto',height:'100%',backgroundImage:`url(${WorkingEnvironmentImage})`, backgroundSize:'100% 100%' }} ><div><Text>hey</Text></div><div><Button>Get started</Button></div></div></Carousel.Slide>
            <Carousel.Slide style={{width:'100%'}}><div style={{display:'grid',justifyItems:'center',alignItems:'center',width:'auto',height:'100%',backgroundImage:`url(${DoctorImage})` ,backgroundSize:' 100% 100%' }} ><div><Text>hello</Text></div><div><Button>Get started</Button></div></div></Carousel.Slide>
            <Carousel.Slide style={{width:'100%'}}><div style={{display:'grid',justifyItems:'center',alignItems:'center',width:'auto',height:'100%',backgroundImage:`url(${EngineeringImage})` ,backgroundSize:' 100% 100%' }} ><div><Text>hi</Text></div><div><Button>Get started</Button></div></div></Carousel.Slide>
            {/* ...other slides */}
           </Carousel>
      </Container>

      <Container>
        <div className={cx(classes.inner, classes.featureSection)}>
          <Stack align="flex-end">
            {features.map((feature, index) => (
              <Box key={`feature-${index}`} className={classes.featureBox}>
                <Text className={classes.featureTitle}>{feature.title}</Text>
                <Text className={classes.featureDescription}>{feature.description}</Text>
              </Box>
            ))}
          </Stack>
          <img className={classes.heroImage4} src={EngineeringImage} alt="Laboratory" />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
