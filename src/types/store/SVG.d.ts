import { Computed, Action } from 'easy-peasy';

export interface ISVGModel {
    palettes: {
        id: string;
        name: string;
        colors: string[];
    }[];
    paletteId: string;
    config: {
        playgrounds: {}[];
        filter: {
            x: string;
            y: string;
            width: string;
            height: string;
            filterUnits: string;
            primitiveUnits: string;
            colorInterpolationFilters: string;
        };
        imageOpacity: number;
        blendMode: string;
        grayscaleType: string;
    };
    blendModeList: string[];
    typesList: {
        id: string;
        name: string;
        value: string;
    }[];
    colorTypeList: string[];

    palette: Computed<
        ISVGModel,
        | {
              id: string;
              name: string;
              colors: string[];
          }
        | undefined
    >;
    options: Computed<
        ISVGModel,
        {
            filterId: string;
            filter: {
                x: string;
                y: string;
                width: string;
                height: string;
                filterUnits: string;
                primitiveUnits: string;
                colorInterpolationFilters: string;
            };
            palette:
                | {
                      id: string;
                      name: string;
                      colors: string[];
                  }
                | undefined;

            imageOpacity: number;
            blendMode: string;
            grayscaleType: string;
            colorInterpolationFilters: string;
        }
    >;
    filterConfig: Computed<
        ISVGModel,
        {
            id: string;
            playgrounds: {}[];
            filter: {
                x: string;
                y: string;
                width: string;
                height: string;
                filterUnits: string;
                primitiveUnits: string;
                colorInterpolationFilters: string;
            };
            palette: {
                id: string;
                name: string;
                colors: string[];
            };
        }
    >;
    getFilterConfig: Computed<
        ISVGModel,
        ({
            palette,
            imageOpacity,
            blendMode,
            grayscaleType,
            colorInterpolationFilters,
        }: Partial<{
            palette: {
                id: string;
                name: string;
                colors: string[];
            };
            imageOpacity: number;
            blendMode: string;
            grayscaleType: string;
            colorInterpolationFilters: string;
        }>) => {
            id: string;
            playgrounds: {}[];
            filter: {
                x: string;
                y: string;
                width: string;
                height: string;
                filterUnits: string;
                primitiveUnits: string;
                colorInterpolationFilters: string | undefined;
            };
            palette: {
                id: string;
                name: string;
                colors: string[];
            };
        } | null
    >;
    setPalatteId: Action<ISVGModel, string>;
    setPalatte: Action<
        ISVGModel,
        Partial<{
            id: string;
            name: string;
            colors: string[];
        }>
    >;
    setConfig: Action<
        ISVGModel,
        Partial<{
            imageOpacity: number;
            blendMode: string;
            grayscaleType: string;
            colorInterpolationFilters: string;
        }>
    >;

    // TODO
    // [key: string]: any;
}
