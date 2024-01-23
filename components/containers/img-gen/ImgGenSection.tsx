"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
//material-ui
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Input, TextField, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import SendIcon from "@mui/icons-material/Send";
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
  //----------------Generated Image----------------//
  const [img_url, setImg_Url] = React.useState(NoneImage);

  // -------------------------------------------//
  const [model, setModel] = React.useState("");
  const [style, setStyle] = React.useState("");
  const [depth, setDepth] = React.useState(0);

  const [styles, setStyles] = React.useState(styles_real);
  const handleChangeModel = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };
  const handleChangeStyle = (event: SelectChangeEvent) => {
    setStyle(event.target.value);
  };
  const handleChangeDepth = (event: SelectChangeEvent) => {
    setDepth(Number(event.target.value));
  };
  const [checked, setChecked] = React.useState(false);
  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setStyles(styles_real);
    } else {
      setStyles(styles_unreal);
    }
  };
  //----------------width and height pixel setting slider------------//
  const [dimension_w, setDimension_w] = React.useState(512);
  const [dimension_h, setDimension_h] = React.useState(512);

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

  return (
    <section
      className="section shop sticky-parent"
      style={{ marginLeft: "20px", marginRight: "20px" }}
    >
      <div className="row">
        <div className="col-12 col-lg-2">
          <div className="shop__sidebar sticky-item">
            <MenuList>
              <MenuItem>
                <ListItemText>Leonardo.ai</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>Midjourney.ai</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>Stability.ai</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>Dall-E-3</ListItemText>
              </MenuItem>
            </MenuList>
          </div>
        </div>
        <div className="col-12 col-lg-3">
          <div className="shop__sidebar sticky-item">
            <div className="shop-sidebar-single shop-search-bar">
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
                  style={{ color: "white" }}
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
                  {models.map((model) => {
                    return (
                      <MenuItem value={model.modelId}>
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
            <div className="shop-sidebar-single shop-category">
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
                  style={{ color: "white" }}
                >
                  Style
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={style}
                  label="style"
                  name="style"
                  onChange={handleChangeStyle}
                  sx={{ color: "white" }}
                  MenuProps={MenuProps}
                >
                  {styles.map((it) => {
                    return <MenuItem value={it}>{it}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="shop-sidebar-single shop-type">
              <div style={{ display: "flex" }}>
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
                    style={{ color: "white" }}
                  >
                    Depth of Field
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={String(depth)}
                    label="depth"
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
              <h5 style={{ fontFamily: "sans-serif" }}>Input Dimention</h5>
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
            <div className="shop-sidebar-single shop-rating">
                
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
              <div className="col-12 col-lg-10">
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
                />
              </div>
              <div className="col-12 col-lg-2">
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<SendIcon />}
                >
                  Generate
                </Button>
              </div>
              <div className="col-12 col-lg-12">
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
                />
              </div>
              <div className="col-12 col-lg-12">
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    sx={{ color: "white", backgroundColor: "green" }}
                    startIcon={<CloudDownloadIcon />}
                  >
                    Download
                  </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src={img_url}
                    alt="Image"
                    priority
                    style={{
                      width: "auto",
                      height: "50%",
                      borderRadius: "10px",
                      marginRight: "10px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const models = [
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
const styles_unreal = [
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
  "NONE",
];
const styles_real = ["CINEMATIC", "CREATIVE", "VIBRANT", "NONE"];
export default ImgGenSection;
