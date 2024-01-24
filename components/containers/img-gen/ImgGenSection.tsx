"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import ThreeDAStyle from "@/public/images/model/3D_Animation_Style.jpg";
import AbsoluteReality from "@/public/images/model/Absolute_Reality_v16.jpg";
import AlbedoBase from "@/public/images/model/AlbedoBase_XL.jpg";
import AnimePastelDream from "@/public/images/model/AnimePastelDream.jpg";
import LeonardoDiffusion from "@/public/images/model/Leonardo_Diffusion_XL.jpg";
import LeonardoVision from "@/public/images/model/Leonardo_Vision_XL.jpg";
import RPG from "@/public/images/model/RPG_v5.jpg";
import SDXL from "@/public/images/model/SDXL_09.jpg";
import DreamShaper from "@/public/images/model/DreamShaper_v7.jpg";
import NoneImage from "@/public/images/blank-image.png";
import NoneImageS from "@/public/images/blank-image-s.png";
//material-ui
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Input, TextField, Button, Box } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import SendIcon from "@mui/icons-material/Send";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const ImgGenSection = () => {
  //----------------page index --------------------//
  const [pageIndex, setPageIndex] = React.useState<number>(0);
  const [indexColor, setIndexColor] = React.useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);
  // ---------------prompt-------------------------//
  const [prompt, setPrompt] = React.useState<string>("");
  const [prompt_n, setPrompt_N] = React.useState<string>("");

  //----------------Generated Image----------------//
  const [img_url, setImg_Url] = React.useState<string>("");

  
  // ---------------------------------------Reonardo.ai page-------------------------------------//
  const [model, setModel] = React.useState<string>(
    "1e60896f-3c26-4296-8ecc-53e2afecc132"
  );
  const [presetStyle, setPresetStyle] = React.useState<string>("DYNAMIC");
  const [depth, setDepth] = React.useState<number>(0.45);

  const [presetStyles, setPresetStyles] = React.useState(styles_unreal);
  const handleChangeModel = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };
  const handleChangeStyle = (event: SelectChangeEvent) => {
    setPresetStyle(event.target.value);
  };
  const handleChangeDepth = (event: SelectChangeEvent) => {
    setDepth(Number(event.target.value));
  };
  const [checked, setChecked] = React.useState<boolean>(false);
  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setPresetStyle("NONE");
    if (event.target.checked) {
      setPresetStyles(styles_real);
    } else {
      setPresetStyles(styles_unreal);
    }
  };
  //------width and height pixel setting slider----//
  const [dimension_w, setDimension_w] = React.useState<number>(512);
  const [dimension_h, setDimension_h] = React.useState<number>(512);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setDimension_w(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDimension_w(
      event.target.value === "" ? 512 : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (dimension_w < 512) {
      setDimension_w(512);
    } else if (dimension_w > 1024) {
      setDimension_w(1024);
    }
  };
  const handleSliderChange_h = (event: Event, newValue: number | number[]) => {
    setDimension_h(newValue as number);
  };

  const handleInputChange_h = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDimension_h(
      event.target.value === "" ? 512 : Number(event.target.value)
    );
  };

  const handleBlur_h = () => {
    if (dimension_h < 512) {
      setDimension_h(512);
    } else if (dimension_h > 1024) {
      setDimension_h(1024);
    }
  };
  // ---------------------------------------Stability.ai page-------------------------------------//
  const [model_s, setModel_S] = React.useState<string>("");
  const [style_s, setStyle_S] = React.useState<string>("");
  const [cfg, setCfg] = React.useState<number>(0);
  const [step, setStep] = React.useState<number>(0);
  const [strength, setStrength] = React.useState<number>(0);

  const handleChangeModel_S = (event: SelectChangeEvent) => {
    setModel_S(event.target.value);
  };
  const handleChangeStyle_S = (event: SelectChangeEvent) => {
    setStyle_S(event.target.value);
  };
  //----cfg scale---//
  const handleSliderChange_cfg = (
    event: Event,
    newValue: number | number[]
  ) => {
    setCfg(newValue as number);
  };

  const handleInputChange_cfg = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCfg(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur_cfg = () => {
    if (cfg < 0) {
      setCfg(0);
    } else if (cfg > 35) {
      setCfg(35);
    }
  };
  //----steps----//
  const handleSliderChange_step = (
    event: Event,
    newValue: number | number[]
  ) => {
    setStep(newValue as number);
  };

  const handleInputChange_step = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStep(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur_step = () => {
    if (step < 0) {
      setStep(0);
    } else if (step > 50) {
      setStep(50);
    }
  };
  //-----strength-----//
  const handleSliderChange_strength = (
    event: Event,
    newValue: number | number[]
  ) => {
    setStrength(newValue as number);
  };

  const handleInputChange_strength = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStrength(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur_strength = () => {
    if (strength < 0) {
      setStrength(0);
    } else if (strength > 1) {
      setStrength(1);
    }
  };
  //-----------------------------choose file-------------------------------------//
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string>("");
  const [fileUrl, setFileUrl] = React.useState<string>("");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setFileUrl(file["name"]);
    } else {
      setFileUrl("");
      setSelectedFile(null);
      setSelectedImage("");
    }
  };
  //------------------------------------------------------------------------------//
  const Generate = async () => {
    if(pageIndex == 0){
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("negative_prompt", prompt_n);
      formData.append("model_id", model);
      formData.append("photoReal", String(checked));
      formData.append("photoRealStrength", String(depth));
      formData.append("height", String(dimension_h));
      formData.append("width", String(dimension_w));
      formData.append("presetStyle", presetStyle);
      // Append init_image and isInit_Image
  
      await axios
        .post("http://localhost:5000/api/image/leonardo", formData, {})
        .then((response) => {
          console.log("response------------->", response.data.result);
          setImg_Url(response.data.result);
        })
        .catch((err) => {
          console.error(err);
          // setNetworkError("Network Error! Please try again later.");
        });
    }
    else if(pageIndex == 1) {

    }
    else if(pageIndex == 2) {

    }
    else{

    }
  };

  return (
    <section
      className="section shop sticky-parent"
      style={{ marginLeft: "8%", marginRight: "8%" }}
    >
      <div className="row">
        <div className="col-12 col-lg-2">
          <div className="shop__sidebar sticky-item">
            <MenuList>
              <MenuItem
                onClick={(e) => {
                  setPageIndex(0);
                  setIndexColor([true, false, false, false]);
                }}
              >
                <ListItemText>
                  <h5
                    style={{
                      borderRadius: "5px",
                      padding: "5px",
                      fontFamily: "serif",
                      fontSize: "20px",
                      backgroundColor: `${indexColor[0] ? "grey" : ""}`,
                    }}
                  >
                    Leonardo
                  </h5>
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  setPageIndex(1);
                  setIndexColor([false, true, false, false]);
                }}
              >
                <ListItemText>
                  <h5
                    style={{
                      borderRadius: "5px",
                      padding: "5px",
                      fontFamily: "serif",
                      fontSize: "20px",
                      backgroundColor: `${indexColor[1] ? "grey" : ""}`,
                    }}
                  >
                    Midjourney
                  </h5>
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  setPageIndex(2);
                  setIndexColor([false, false, true, false]);
                }}
              >
                <ListItemText>
                  <h5
                    style={{
                      borderRadius: "5px",
                      padding: "5px",
                      fontFamily: "serif",
                      fontSize: "20px",
                      backgroundColor: `${indexColor[2] ? "grey" : ""}`,
                    }}
                  >
                    Stability
                  </h5>
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  setPageIndex(3);
                  setIndexColor([false, false, false, true]);
                }}
              >
                <ListItemText>
                  <h5
                    style={{
                      borderRadius: "5px",
                      padding: "5px",
                      fontFamily: "serif",
                      fontSize: "20px",
                      backgroundColor: `${indexColor[3] ? "grey" : ""}`,
                    }}
                  >
                    Dall-E-3
                  </h5>
                </ListItemText>
              </MenuItem>
            </MenuList>
          </div>
        </div>
        <div className="col-12 col-lg-3">
          <div
            className="shop__sidebar sticky-item"
            hidden={pageIndex == 0 ? false : true}
          >
            <div
              className="shop-sidebar-single shop-search-bar"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <FormControl
                sx={{
                  m: 1,
                  minWidth: "80%",
                  background: "rgb(46,40,70)",
                  borderRadius: "10px",
                }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{ color: "white" }}
                >
                  Model
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  name="model"
                  value={model}
                  label="Model"
                  onChange={handleChangeModel}
                  sx={{ color: "white" }}
                  MenuProps={MenuProps}
                >
                  {models.map((model, index: number) => {
                    return (
                      <MenuItem key={index} value={model.modelId}>
                        <Image
                          src={model.modelImage}
                          alt="Image"
                          priority
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "10px",
                            marginRight: "10px",
                          }}
                        />
                        {model.modelName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div
              className="shop-sidebar-single shop-category"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <FormControl
                sx={{
                  m: 1,
                  minWidth: "80%",
                  background: "rgb(46,40,70)",
                  borderRadius: "10px",
                }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{ color: "white" }}
                >
                  Style
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={presetStyle}
                  label="style"
                  name="style"
                  onChange={handleChangeStyle}
                  sx={{ color: "white" }}
                  MenuProps={MenuProps}
                >
                  {presetStyles.map((it, index) => {
                    return (
                      <MenuItem key={index} value={it}>
                        {it}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="shop-sidebar-single shop-type">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={handleChangeCheck}
                      name="Photo Real"
                      color="secondary"
                      sx={{
                        backgroundColor: "rgb(46,40,70)",
                        borderRadius: "10px",
                      }}
                    />
                  }
                  label="Photo Real"
                />
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: "50%",
                    background: "rgb(46,40,70)",
                    borderRadius: "10px",
                  }}
                >
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    sx={{ color: "white" }}
                  >
                    Depth of Field
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={String(depth)}
                    label="depth of field"
                    name="depth"
                    onChange={handleChangeDepth}
                    sx={{ color: "white" }}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value={0.45}>low</MenuItem>
                    <MenuItem value={0.5}>medium</MenuItem>
                    <MenuItem value={0.55}>high</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="shop-sidebar-single shop-rating">
              <h5 style={{ fontFamily: "sans-serif", marginBottom: "10px" }}>
                Input Dimension
              </h5>
              <div
                className="row container"
                style={{ alignItems: "center", rowGap: "10px" }}
              >
                <div className="col-12 col-lg-3">Width</div>
                <div className="col-12 col-lg-7">
                  <Slider
                    value={typeof dimension_w === "number" ? dimension_w : 512}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    min={512}
                    max={1024}
                  />
                </div>
                <div className="col-12 col-lg-2">
                  <Input
                    value={dimension_w}
                    size="small"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 10,
                      min: 512,
                      max: 1024,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </div>
                <div className="col-12 col-lg-3">Height</div>
                <div className="col-12 col-lg-7">
                  <Slider
                    value={typeof dimension_h === "number" ? dimension_h : 512}
                    onChange={handleSliderChange_h}
                    aria-labelledby="input-slider"
                    min={512}
                    max={1024}
                  />
                </div>
                <div className="col-12 col-lg-2">
                  <Input
                    value={dimension_h}
                    size="small"
                    onChange={handleInputChange_h}
                    onBlur={handleBlur_h}
                    inputProps={{
                      step: 10,
                      min: 512,
                      max: 1024,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="shop-sidebar-single shop-rating"></div>
          </div>
          <div
            className="shop__sidebar sticky-item"
            hidden={pageIndex == 1 ? false : true}
          >
            <div className="shop-sidebar-single shop-rating">Midjourney.ai</div>
          </div>
          <div
            className="shop__sidebar sticky-item"
            hidden={pageIndex == 2 ? false : true}
          >
            <div
              className="shop-sidebar-single shop-rating"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <FormControl
                sx={{
                  m: 1,
                  minWidth: "80%",
                  background: "rgb(46,40,70)",
                  borderRadius: "10px",
                }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{ color: "white" }}
                >
                  Model
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  name="model_s"
                  value={model_s}
                  label="Model"
                  onChange={handleChangeModel_S}
                  sx={{ color: "white" }}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="Stable Diffusion XL 1.0">
                    Stable Diffusion XL 1.0
                  </MenuItem>
                  <MenuItem value="Stable Diffusion 1.6">
                    Stable Diffusion 1.6
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              className="shop-sidebar-single shop-rating"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <FormControl
                sx={{
                  m: 1,
                  minWidth: "80%",
                  background: "rgb(46,40,70)",
                  borderRadius: "10px",
                }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{ color: "white" }}
                >
                  Style
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={style_s}
                  label="style"
                  name="style"
                  onChange={handleChangeStyle_S}
                  sx={{ color: "white" }}
                  MenuProps={MenuProps}
                >
                  {styles.map((it, index) => {
                    return (
                      <MenuItem key={index} value={it}>
                        {it}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div
              className="shop-sidebar-single shop-rating"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <div className="col-12 col-lg-4">CFG Scale</div>
              <div className="col-12 col-lg-7">
                <Slider
                  value={typeof cfg === "number" ? cfg : 0}
                  onChange={handleSliderChange_cfg}
                  aria-labelledby="input-slider"
                  min={0}
                  max={35}
                />
              </div>
              <div className="col-12 col-lg-1">
                <Input
                  value={cfg}
                  size="small"
                  onChange={handleInputChange_cfg}
                  onBlur={handleBlur_cfg}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 35,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </div>
            </div>
            <div
              className="shop-sidebar-single shop-rating"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <div className="col-12 col-lg-4">Steps</div>
              <div className="col-12 col-lg-7">
                <Slider
                  value={typeof step === "number" ? step : 0}
                  onChange={handleSliderChange_step}
                  aria-labelledby="input-slider"
                  step={10}
                  min={0}
                  max={50}
                />
              </div>
              <div className="col-12 col-lg-1">
                <Input
                  value={step}
                  size="small"
                  onChange={handleInputChange_step}
                  onBlur={handleBlur_step}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 50,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </div>
            </div>
            <div
              className="shop-sidebar-single shop-rating"
              style={{
                display: "flex",
                justifyContent: "space-aroun",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <div className="col-12 col-lg-4">Init&nbsp;Strength</div>
              <div className="col-12 col-lg-7">
                <Slider
                  value={typeof strength === "number" ? strength : 0}
                  onChange={handleSliderChange_strength}
                  aria-labelledby="input-slider"
                  step={0.01}
                  min={0}
                  max={1}
                />
              </div>
              <div className="col-12 col-lg-1">
                <Input
                  value={strength}
                  size="small"
                  onChange={handleInputChange_strength}
                  onBlur={handleBlur_strength}
                  inputProps={{
                    step: 0.01,
                    min: 0,
                    max: 1,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="shop__sidebar sticky-item"
            hidden={pageIndex == 3 ? true : false}
            style={{ marginTop: "10px" }}
          >
            <div
              className="shop-sidebar-single shop-rating"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    borderRadius: 10,
                    color: "white",
                    width: "fit-content",
                  }}
                  endIcon={<DescriptionIcon />}
                >
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                  />
                  Choose File
                </Button>
                <Box height="250px">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      style={{
                        width: "auto",
                        height: "200px",
                        borderRadius: "8px",
                      }}
                      alt="UploadImage"
                    />
                  ) : (
                    <Image
                      src={NoneImageS}
                      alt="Image"
                      priority
                      style={{
                        width: "auto",
                        height: "200px",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <h5 style={{ textAlign: "center", fontSize: "12px" }}>
                    {fileUrl}
                  </h5>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-7">
          <div className="shop__sidebar sticky-item">
            <div
              className="row"
              style={{
                rowGap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="col-12 col-lg-9">
                <TextField
                  id="filled-search"
                  label="Prompt"
                  type="search"
                  variant="filled"
                  className="prompt-field"
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <div className="col-12 col-lg-2">
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<SendIcon />}
                  onClick={Generate}
                  sx={{ width: "130px" }}
                >
                  Generate
                </Button>
              </div>
              <div className="col-12 col-lg-11">
                <TextField
                  id="filled-search"
                  label="NegativePrompt"
                  type="search"
                  variant="filled"
                  className="prompt-field"
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  onChange={(e) => setPrompt_N(e.target.value)}
                />
              </div>
              <div className="col-12 col-lg-11">
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: "130px" }}
                    startIcon={<CloudDownloadIcon />}
                  >
                    Download
                  </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {img_url == "" ? (
                    <Image
                      src={NoneImage}
                      alt="Image"
                      priority
                      style={{
                        width: "auto",
                        height: "50%",
                        borderRadius: "10px",
                        marginRight: "10px",
                      }}
                    />
                  ) : (
                    <img
                      src={img_url}
                      alt="Image"
                      style={{
                        width: "auto",
                        height: "50%",
                        borderRadius: "10px",
                        marginRight: "10px",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type Model = {
  id: Number;
  modelName: string;
  modelImage: StaticImageData;
  modelId: string;
};

const models: Model[] = [
  {
    id: 1,
    modelName: "Leonardo Diffusion XL",
    modelImage: LeonardoDiffusion,
    modelId: "1e60896f-3c26-4296-8ecc-53e2afecc132",
  },
  {
    id: 2,
    modelName: "Leonardo Vision XL",
    modelImage: LeonardoVision,
    modelId: "5c232a9e-9061-4777-980a-ddc8e65647c6",
  },
  {
    id: 3,
    modelName: "AlbedoBase XL",
    modelImage: AlbedoBase,
    modelId: "2067ae52-33fd-4a82-bb92-c2c55e7d2786",
  },
  {
    id: 4,
    modelName: "DreamShaper v7",
    modelImage: DreamShaper,
    modelId: "ac614f96-1082-45bf-be9d-757f2d31c174",
  },
  {
    id: 5,
    modelName: "Absolute Reality v1.6",
    modelImage: AbsoluteReality,
    modelId: "e316348f-7773-490e-adcd-46757c738eb7",
  },
  {
    id: 6,
    modelName: "Anime Pastel Dream",
    modelImage: AnimePastelDream,
    modelId: "1aa0f478-51be-4efd-94e8-76bfc8f533af",
  },
  {
    id: 7,
    modelName: "RPG v5",
    modelImage: RPG,
    modelId: "f1929ea3-b169-4c18-a16c-5d58b4292c69",
  },
  {
    id: 8,
    modelName: "3D Animation Style",
    modelImage: ThreeDAStyle,
    modelId: "d69c8273-6b17-4a30-a13e-d6637ae1c644",
  },
  {
    id: 9,
    modelName: "SDXL 0.9",
    modelImage: SDXL,
    modelId: "b63f7119-31dc-4540-969b-2a9df997e173",
  },
];
const styles_unreal: string[] = [
  "ANIME",
  "CREATIVE",
  "DYNAMIC",
  "ENVIRONMENT",
  "GENERAL",
  "ILLUSTRATION",
  "PHOTOGRAPHY",
  "RAYTRACED",
  "RENDER_3D",
  "SKETCH_BW",
  "SKETCH_COLOR",
  "CINEMATIC",
  "CREATIVE",
  "VIBRANT",
  "NONE",
];
const styles_real: string[] = ["CINEMATIC", "CREATIVE", "VIBRANT", "NONE"];
const styles: string[] = [
  "enhance",
  "anime",
  "photographic",
  "digital-art",
  "comic-book",
  "fantasy-art",
  "line-art",
  "analog-film",
  "neon-punk",
  "isometric",
  "low-poly",
  "origami",
  "modeling-compound",
  "cinematic",
  "3d-model",
  "pixel-art",
  "tile-texture",
];
export default ImgGenSection;
