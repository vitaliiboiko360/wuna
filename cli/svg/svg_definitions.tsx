import React from 'react';

export default function SvgDefinitions(props) {
  return (
    <>
      <defs>
        <filter id="editing-goldstamp">
          <feFlood floodColor="#5d4979" result="flood"></feFlood>
          <feMorphology
            operator="dilate"
            radius="2"
            in="SourceGraphic"
            result="outline"
          ></feMorphology>
          <feComposite
            operator="in"
            in="flood"
            in2="outline"
            result="outline2"
          ></feComposite>
          <feGaussianBlur
            stdDeviation="4"
            in="SourceAlpha"
            result="blur"
          ></feGaussianBlur>
          <feSpecularLighting
            surfaceScale="2"
            specularConstant="0.7"
            specularExponent="10"
            lightingColor="#white"
            in="blur"
            result="specular"
          >
            <fePointLight x="200" y="-1000" z="300"></fePointLight>
          </feSpecularLighting>
          <feComposite
            operator="in"
            in="specular"
            in2="SourceGraphic"
            result="specular2"
          ></feComposite>
          <feComposite
            in="SourceGraphic"
            in2="specular2"
            operator="arithmetic"
            k1="3"
            k2="2"
            k3="1"
            k4="0"
            result="specular3"
          ></feComposite>
          <feMerge>
            <feMergeNode in="outline2"></feMergeNode>
            <feMergeNode in="specular3"></feMergeNode>
          </feMerge>
        </filter>
        <style>{`.user-name {
display: inline-block;
color: #999569;
font-size: 1.1rem;
font-weight: 600;
font-family: Arial Black;
}`}</style>
      </defs>
    </>
  );
}

// dominant-baseline: central;
// text-anchor: middle;
