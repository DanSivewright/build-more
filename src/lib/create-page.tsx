// https://gist.github.com/Pagebakers/f39f154e5bb6b03c477cb4a1d88ac937
import { AnyZodObject, z } from 'zod'
import { Metadata, ResolvingMetadata } from 'next'

type InferParams<Params> = Params extends readonly string[]
  ? {
      [K in Params[number]]: string
    }
  : Params extends AnyZodObject
    ? z.infer<Params>
    : unknown

type LoaderFn<
  Params extends readonly string[] | AnyZodObject,
  SearchParams extends readonly string[] | AnyZodObject,
> = (args: { params: InferParams<Params>; searchParams: InferParams<SearchParams> }) => Promise<any>

type InferLoaderData<Loader> = Loader extends (args: any) => Promise<infer T> ? T : unknown

export interface CreatePageProps<
  Params extends readonly string[] | AnyZodObject,
  SearchParams extends readonly string[] | AnyZodObject,
  Loader extends LoaderFn<Params, SearchParams> = LoaderFn<Params, SearchParams>,
> {
  params?: Params
  searchParams?: SearchParams
  loader?: Loader
  metadata?:
    | Metadata
    | ((
        args: {
          params: InferParams<Params>
          searchParams: InferParams<SearchParams>
          data: InferLoaderData<Loader>
        },
        parent: ResolvingMetadata,
      ) => Promise<Metadata>)
  component: React.ComponentType<{
    params: InferParams<Params>
    searchParams?: InferParams<SearchParams>
    data: InferLoaderData<Loader>
    children?: React.ReactNode // Add children prop
  }>
}

function parseParams<Schema extends readonly string[] | AnyZodObject>(
  params: Record<string, string>,
  schema?: Schema,
) {
  if (schema && 'parse' in schema) {
    return schema.parse(params) as InferParams<Schema>
  }

  return params as InferParams<Schema>
}

export const createPage = <
  const Params extends readonly string[] | AnyZodObject,
  const SearchParams extends readonly string[] | AnyZodObject,
  Loader extends LoaderFn<Params, SearchParams> = LoaderFn<Params, SearchParams>,
>(
  props: CreatePageProps<Params, SearchParams, Loader>,
) => {
  const {
    params: paramsSchema,
    searchParams: searchParamsSchema,
    component: PageComponent,
    loader,
    metadata,
  } = props

  // We don't really care about the types here since it's internal
  async function Page(props: any) {
    const params = parseParams(props.params, paramsSchema)
    const searchParams = parseParams(props.searchParams, searchParamsSchema)

    let pageProps: any = {
      params,
      searchParams,
      children: props.children, // Add children prop
    }

    if (typeof loader === 'function') {
      const data = await loader(pageProps)

      pageProps = {
        ...pageProps,
        data,
      }
    }

    return <PageComponent {...pageProps} />
  }

  if (typeof metadata === 'function') {
    return {
      generateMetaData: async (
        {
          params,
          searchParams,
        }: {
          params: InferParams<Params>
          searchParams: InferParams<SearchParams>
        },
        parent: ResolvingMetadata,
      ) => {
        const data =
          typeof loader === 'function'
            ? await loader({
                params,
                searchParams,
              })
            : undefined

        return metadata(
          {
            params,
            searchParams,
            data,
          },
          parent,
        )
      },
      Page,
    }
  }

  return {
    metadata,
    Page,
  }
}
