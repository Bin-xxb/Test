import {
	createStyles,
	Header,
	Group,
	Button,
	Divider,
	Center,
	Burger,
	Drawer,
	ScrollArea,
	rem,
	Menu,
	NavLink,
	Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import ArrowToBottom from "../public/assets/cmsImages/arrow-alt-to-bottom.svg";
import { HomeProps } from "../types";
import Link from "next/link";
import variable from "../styles/theme/variables";
import print from "../styles/print.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
	"body .mantine-Menu-item": {
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	header: {
		border: "none",
		display: "flex",

		[variable.lgDown]: {
			justifyContent: "space-between",
		},
	},
	link: {
		display: "flex",
		alignItems: "center",
		height: "100%",
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		textDecoration: "none",
		fontFamily: variable.fontFamily,
		fontWeight: variable.fontWeightMedium,
		fontSize: variable.fontSizeBase,
		color: variable.blue,
		"@media (max-width: 1350px)": {
			paddingLeft: variable.spacer3,
			paddingRight: variable.spacer3,
		},
		"@media (max-width: 1250px)": {
			paddingLeft: variable.spacer2,
			paddingRight: variable.spacer2,
		},

		"&:hover": {
			"& svg": {
				color: "red",
			},
		},

		"& svg": {
			color: variable.blue,
		},
		[theme.fn.smallerThan("sm")]: {
			height: rem(42),
			display: "flex",
			alignItems: "center",
			width: "100%",
		},

		...theme.fn.hover({
			color: variable.red300,
		}),
	},

	subLink: {
		width: "100%",
		padding: variable.spacer4,
		//borderRadius: theme.radius.md,
		color: variable.blue,
		fontFamily: variable.fontFamily,
		fontWeight: variable.fontWeightRegular,

		...theme.fn.hover({
			color: variable.red300,
			backgroundColor: "unset",
		}),

		"&:active": theme.activeStyles,
	},

	logo: {
		marginRight: variable.spacer5,
	},

	flex: {
		display: "flex",
	},

	hiddenMobile: {
		display: "flex",

		"& span": {
			marginRight: 0,
		},
		[variable.lgDown]: {
			display: "none",
		},

		"& a": {
			marginRight: variable.spacer5,
			height: "42px",
			justifyContent: "center",
			borderRadius: "4px",
			"@media (max-width: 1350px)": {
				marginRight: variable.spacer0,
			}
		},
		"& a:first-of-type": {
			width: "124px",
		},
	},

	mobileDrawer: {
		display: "none",
	},

	hiddenDesktop: {
		"@media(min-width: 1199px)": {
			display: "none",
		},
		"& .mantine-Modal-header, & .mantine-Drawer-header": {
			justifyContent: "right",
			"& .mantine-Modal-close, & .mantine-Drawer-close": {
				color: variable.grey500,
				"& svg": {
					width: "2rem",
					height: "2rem",
				},
			},
			[variable.lgDown]: {
				position: "absolute",
				right: "20px",
				top: "20px",
			},
		},
	},

	linkLabel: {
		marginRight: rem(5),
	},

	buttonAlt: {
		color: variable.white,
		fontSize: variable.fontSizeSm,
		fontWeight: variable.fontWeightSemiBold,
		lineHeight: "42px",
		textAlign: "center",
		backgroundColor: variable.red300,
		"&.width-alt": {
			width: "124px",
		},
		"&:hover, :not([data-disabled]):hover": {
			backgroundColor: variable.red500,
		},
	},
	pdf: {
		position: "absolute",
		right: "1rem",

		[variable.lgDown]: {
			display: "none !important",
		},
	},
}));

// get a element from pdf header entry
const extractAnchorElements = (htmlString: string) => {
	const parser = new DOMParser();
	const htmlDoc = parser.parseFromString(htmlString, "text/html");
	const anchors = htmlDoc.getElementsByTagName("a");
	const anchorElements: string[] = [];

	for (let i = 0; i < anchors.length; i++) {
		anchorElements.push(anchors[i].outerHTML);
	}
	//console.log("anchor:" + anchorElements);
	return anchorElements;
};

export default function HeaderMenu({ data }: HomeProps): JSX.Element {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	//const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
	const { classes, theme } = useStyles();
	const [anchorElements, setAnchorElements] = useState<string[]>([]);

	useEffect(() => {
		setAnchorElements(extractAnchorElements(data.PDFEntry.redactor));
	}, []);

	const nav = data.navigationNodes;

	const headerItems = nav.filter((item) => item.navHandle === "header");

	const mainHeader = headerItems.map((nv) => {
		const menuItems = nv.children?.map((n) => (
			<Link key={n.id} href={n.nodeUri}>
				<Menu.Item className={classes.subLink}>{n.title}</Menu.Item>
			</Link>
		));

		if (menuItems) {
			return (
				<Menu
					key={nv.id}
					trigger="hover"
					transitionProps={{ exitDuration: 0 }}
					withinPortal
				>
					<Menu.Target>
						<a
							href="#"
							className={classes.link}
							aria-label={nv.navHandle}
							onClick={(event) => event.preventDefault()}
						>
							<Center>
								<span className={classes.linkLabel}>
									{nv.title}
								</span>
								<IconChevronDown size="1.2rem" stroke={2.3} />
							</Center>
						</a>
					</Menu.Target>
					<Menu.Dropdown
						sx={{
							boxShadow:
								"0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 4px 0 rgba(0,0,0,0.02)",
							border: "1px solid #EDEFF1",
						}}
					>
						{menuItems}
					</Menu.Dropdown>
				</Menu>
			);
		}

		return (
			<a
				key={nv.id}
				href={nv.url}
				className={classes.link}
				onClick={(event) => event.preventDefault()}
			>
				{nv.title}
			</a>
		);
	});

	const mainNavMobile = headerItems.map((nv) => {
		const subNav = nv.children?.map((n) => (
			<NavLink
				key={n.id}
				component="a"
				href={n.nodeUri}
				label={n.title}
			/>
		));

		if (subNav) {
			return (
				<NavLink key={nv.id} label={nv.title}>
					{subNav}
				</NavLink>
			);
		}

		return (
			<a
				key={nv.id}
				href={nv.url}
				className={classes.link}
				onClick={(event) => event.preventDefault()}
			>
				{nv.title}
			</a>
		);
	});
	/*
	const pdfNavMobile = pdfItems.map((nv) => {
		const subNav = nv.children?.map((n) => (
			<NavLink
				component="a"
				href={n.nodeUri}
				label={n.title}
				key={n.id}
			/>
		));

		if (subNav) {
			return (
				<NavLink key={nv.id} label={nv.title}>
					{subNav}
				</NavLink>
			);
		}

		return (
			<a
				key={nv.id}
				href={nv.url}
				className={classes.link}
				onClick={(event) => event.preventDefault()}
			>
				{nv.title}
			</a>
		);
	});
*/
	return (
		<Container
			size={variable.breakpointXl}
			px={variable.spacer4}
			className={print.printHide}
			sx={{
				position: "relative",
				[variable.lgDown]: {
					paddingRight: 0,
				},
			}}
		>
			<Header
				height={98}
				px="md"
				className={classes.header}
				sx={{
					[variable.lgDown]: {
						height: "64px",
						maxHeight: "64px",
					},
				}}
			>
				<Group>
					<Link href="/" className={classes.logo}>
						<Image
							src="/assets/cmsImages/cvd.logo.svg"
							alt="CVD Logo"
							width={200}
							height={50}
						/>
					</Link>

					<div className={classes.hiddenMobile}>
						<Link href="/calculator" className={`${classes.buttonAlt} ${print.hiddenMobile}`}>
							Calculator
						</Link>
						{mainHeader}
					</div>
					<Menu
						trigger="hover"
						transitionProps={{ exitDuration: 0 }}
						withinPortal
					>
						<Menu.Target>
							<a
								href="#"
								className={`${classes.link} ${classes.pdf}`}
								onClick={(event) => event.preventDefault()}
							>
								<Center
									sx={{
										"& .arrow-alt-to-bottom": {
											width: "16px",
											height: "16px",
											marginLeft: variable.spacer1,
											fill: variable.red300,
										},
									}}
								>
									<span className={classes.linkLabel}>
										{data.PDFEntry.title}
									</span>
									<ArrowToBottom className="arrow-alt-to-bottom" />
								</Center>
							</a>
						</Menu.Target>
						<Menu.Dropdown>
							{anchorElements.map((element, index) => (
								<div
									key={index}
									dangerouslySetInnerHTML={{
										__html: element,
									}}
								/>
							))}
						</Menu.Dropdown>
					</Menu>
				</Group>
				<Burger
					size={17}
					opened={drawerOpened}
					onClick={toggleDrawer}
					className={classes.hiddenDesktop}
					sx={{
						padding: "30px 1rem 30px 30px",
					}}
				/>
			</Header>
			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				className={classes.hiddenDesktop}
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
					<Group
						className={classes.logo}
						sx={{ margin: "14px 0 14px 16px" }}
					>
						<Link href="/">
							<Image
								src="/assets/cmsImages/cvd.logo.svg"
								alt="CVD Logo"
								width={200}
								height={50}
							/>
						</Link>
					</Group>
					<Divider
						my="sm"
						color={
							theme.colorScheme === "dark"
								? "rgba(69,89,100,0.16)"
								: "rgba(69,89,100,0.16)"
						}
					/>

					<Group
						sx={{
							height: "100%",
							padding: "25px 16px 2px 16px",
							"& .mantine-NavLink-root": {
								marginBottom: "15px",
							},
							"& .mantine-NavLink-label": {
								fontSize: variable.fontSizeBase,
								fontFamily: variable.fontFamily,
								fontWeight: variable.fontWeightMedium,
								color: "#191B5E",
								LineHeight: "25px",
							},
							"& .mantine-NavLink-body": {
								flex: "inherit",
							},
							"& .mantine-NavLink-rightSection": {
								transform: "rotate(90deg)",
								"& svg": {
									width: "20px",
									height: "20px",
								},
							},
							"& .mantine-UnstyledButton-root": {
								"&:hover, &:focus, &:active": {
									backgroundColor: "transparent",
								},
								"&[data-expanded='true']": {
									"& .mantine-NavLink-label": {
										color: variable.red300,
									},
									"& .mantine-NavLink-rightSection": {
										"& svg": {
											color: variable.red300,
											transform:
												"rotate(90deg) !important",
										},
									},
								},
							},
							"& .mantine-NavLink-children": {
								paddingBottom: variable.spacer3,
								"& .mantine-NavLink-label": {
									fontFamily: variable.fontFamily,
									fontWeight: variable.fontWeightRegular,
									fontSize: variable.fontSizeSm,
									lineHeight: "20px",
								},
							},
						}}
						spacing={0}
					>
						{mainNavMobile}
					</Group>
					<Divider
						my="sm"
						sx={{
							width: "calc(100% - 32px)",
							margin: "auto",
						}}
						color={
							theme.colorScheme === "dark"
								? "rgba(69,89,100,0.16)"
								: "rgba(69,89,100,0.16)"
						}
					/>
					<Group
						sx={{
							height: "100%",
							padding: "25px 20px 20px 16px",
							justifyContent: "center",
							"& .mantine-NavLink-label": {
								fontSize: variable.fontSizeBase,
								fontFamily: variable.fontFamily,
								fontWeight: variable.fontWeightMedium,
								color: "#191B5E",
								LineHeight: "25px",
								textAlign: "center",
							},
							"& .mantine-NavLink-body": {
								flex: "inherit",
							},
							"& .mantine-NavLink-rightSection": {
								"&:before": {
									content: `''`,
									width: "17px",
									height: "17px",
									marginLeft: "2px",
									background:
										"url('/assets/cmsImages/arrow-alt-to-bottom-red.svg')",
									backgroundRepeat: "no-repeat",
								},
								"& svg": {
									display: "none",
								},
							},
							"& .mantine-UnstyledButton-root": {
								justifyContent: "center",
								"&:hover, &:focus, &:active": {
									backgroundColor: "transparent",
								},
								"&[data-expanded='true']": {
									"& .mantine-NavLink-label": {
										color: variable.red300,
									},
									"& .mantine-NavLink-rightSection": {
										transform: "rotate(0deg)",
									},
								},
							},
							"& .mantine-NavLink-children": {
								paddingBottom: variable.spacer3,
								"& .mantine-NavLink-label, & a": {
									fontFamily: variable.fontFamily,
									fontWeight: variable.fontWeightRegular,
									fontSize: variable.fontSizeSm,
									lineHeight: "20px",
									color: variable.blue,
								},
							},
						}}
						spacing={0}
					>
						<NavLink
							key={data.PDFEntry.id}
							label={data.PDFEntry.title}
						>
							{anchorElements.map((element, index) => (
								<div
									key={index}
									dangerouslySetInnerHTML={{
										__html: element,
									}}
								/>
							))}
						</NavLink>
					</Group>

					<Group
						position="center"
						grow
						pb="xl"
						px="md"
						sx={{ padding: "0px 20px 20px 16px" }}
					>
						<Button
							component="a"
							href="/calculator"
							className={classes.buttonAlt}
							aria-label="calculator"
						>
							Calculator
						</Button>
					</Group>
				</ScrollArea>
			</Drawer>
		</Container>
	);
}
