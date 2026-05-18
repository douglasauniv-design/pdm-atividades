import Caroussel from "@/components/caroussel";
import ScreenWrapper from "@/components/screen-wrapper";
import { metallicaAlbums } from "@/mocks/albums";
import React from "react";

export default function index() {
  return (
    <ScreenWrapper>
      <Caroussel title="Metallica" albums={metallicaAlbums} />
      <Caroussel title="Metallica" albums={metallicaAlbums} />
      <Caroussel title="Metallica" albums={metallicaAlbums} />
      <Caroussel title="Metallica" albums={metallicaAlbums} />
      <Caroussel title="Metallica" albums={metallicaAlbums} />
      <Caroussel title="Metallica" albums={metallicaAlbums} />
    </ScreenWrapper>
  );
}