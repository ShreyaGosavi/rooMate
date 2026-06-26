
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Property
 * 
 */
export type Property = $Result.DefaultSelection<Prisma.$PropertyPayload>
/**
 * Model PropertyStats
 * 
 */
export type PropertyStats = $Result.DefaultSelection<Prisma.$PropertyStatsPayload>
/**
 * Model SavedProperty
 * 
 */
export type SavedProperty = $Result.DefaultSelection<Prisma.$SavedPropertyPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PropertyType: {
  PG_HOSTEL: 'PG_HOSTEL',
  APARTMENT: 'APARTMENT',
  OTHER: 'OTHER'
};

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const BHK: {
  ONE_BHK: 'ONE_BHK',
  TWO_BHK: 'TWO_BHK',
  THREE_BHK: 'THREE_BHK',
  FOUR_BHK: 'FOUR_BHK',
  ONE_RK: 'ONE_RK'
};

export type BHK = (typeof BHK)[keyof typeof BHK]


export const PropertyVerificationStatus: {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

export type PropertyVerificationStatus = (typeof PropertyVerificationStatus)[keyof typeof PropertyVerificationStatus]


export const AmenityType: {
  WIFI: 'WIFI',
  AC: 'AC',
  PARKING: 'PARKING',
  LAUNDRY: 'LAUNDRY',
  GYM: 'GYM',
  POWER_BACKUP: 'POWER_BACKUP',
  WATER_SUPPLY: 'WATER_SUPPLY',
  FURNISHED_BED: 'FURNISHED_BED',
  ATTACHED_BATHROOM: 'ATTACHED_BATHROOM',
  SECURITY: 'SECURITY',
  CCTV: 'CCTV',
  LIFT: 'LIFT',
  PURIFIER: 'PURIFIER',
  OTHERS: 'OTHERS'
};

export type AmenityType = (typeof AmenityType)[keyof typeof AmenityType]

}

export type PropertyType = $Enums.PropertyType

export const PropertyType: typeof $Enums.PropertyType

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type BHK = $Enums.BHK

export const BHK: typeof $Enums.BHK

export type PropertyVerificationStatus = $Enums.PropertyVerificationStatus

export const PropertyVerificationStatus: typeof $Enums.PropertyVerificationStatus

export type AmenityType = $Enums.AmenityType

export const AmenityType: typeof $Enums.AmenityType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Properties
 * const properties = await prisma.property.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Properties
   * const properties = await prisma.property.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.property`: Exposes CRUD operations for the **Property** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Properties
    * const properties = await prisma.property.findMany()
    * ```
    */
  get property(): Prisma.PropertyDelegate<ExtArgs>;

  /**
   * `prisma.propertyStats`: Exposes CRUD operations for the **PropertyStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyStats
    * const propertyStats = await prisma.propertyStats.findMany()
    * ```
    */
  get propertyStats(): Prisma.PropertyStatsDelegate<ExtArgs>;

  /**
   * `prisma.savedProperty`: Exposes CRUD operations for the **SavedProperty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedProperties
    * const savedProperties = await prisma.savedProperty.findMany()
    * ```
    */
  get savedProperty(): Prisma.SavedPropertyDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Property: 'Property',
    PropertyStats: 'PropertyStats',
    SavedProperty: 'SavedProperty'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "property" | "propertyStats" | "savedProperty"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Property: {
        payload: Prisma.$PropertyPayload<ExtArgs>
        fields: Prisma.PropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findFirst: {
            args: Prisma.PropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findMany: {
            args: Prisma.PropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          create: {
            args: Prisma.PropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          createMany: {
            args: Prisma.PropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          delete: {
            args: Prisma.PropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          update: {
            args: Prisma.PropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          deleteMany: {
            args: Prisma.PropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          aggregate: {
            args: Prisma.PropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperty>
          }
          groupBy: {
            args: Prisma.PropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyCountAggregateOutputType> | number
          }
        }
      }
      PropertyStats: {
        payload: Prisma.$PropertyStatsPayload<ExtArgs>
        fields: Prisma.PropertyStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyStatsPayload>
          }
          findFirst: {
            args: Prisma.PropertyStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyStatsPayload>
          }
          findMany: {
            args: Prisma.PropertyStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyStatsPayload>[]
          }
          create: {
            args: Prisma.PropertyStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyStatsPayload>
          }
          createMany: {
            args: Prisma.PropertyStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyStatsPayload>[]
          }
          delete: {
            args: Prisma.PropertyStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyStatsPayload>
          }
          update: {
            args: Prisma.PropertyStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyStatsPayload>
          }
          deleteMany: {
            args: Prisma.PropertyStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PropertyStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyStatsPayload>
          }
          aggregate: {
            args: Prisma.PropertyStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyStats>
          }
          groupBy: {
            args: Prisma.PropertyStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyStatsCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyStatsCountAggregateOutputType> | number
          }
        }
      }
      SavedProperty: {
        payload: Prisma.$SavedPropertyPayload<ExtArgs>
        fields: Prisma.SavedPropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedPropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedPropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPropertyPayload>
          }
          findFirst: {
            args: Prisma.SavedPropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedPropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPropertyPayload>
          }
          findMany: {
            args: Prisma.SavedPropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPropertyPayload>[]
          }
          create: {
            args: Prisma.SavedPropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPropertyPayload>
          }
          createMany: {
            args: Prisma.SavedPropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedPropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPropertyPayload>[]
          }
          delete: {
            args: Prisma.SavedPropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPropertyPayload>
          }
          update: {
            args: Prisma.SavedPropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPropertyPayload>
          }
          deleteMany: {
            args: Prisma.SavedPropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedPropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SavedPropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPropertyPayload>
          }
          aggregate: {
            args: Prisma.SavedPropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedProperty>
          }
          groupBy: {
            args: Prisma.SavedPropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedPropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedPropertyCountArgs<ExtArgs>
            result: $Utils.Optional<SavedPropertyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PropertyCountOutputType
   */

  export type PropertyCountOutputType = {
    SavedProperty: number
  }

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SavedProperty?: boolean | PropertyCountOutputTypeCountSavedPropertyArgs
  }

  // Custom InputTypes
  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCountOutputType
     */
    select?: PropertyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountSavedPropertyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedPropertyWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Property
   */

  export type AggregateProperty = {
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  export type PropertyAvgAggregateOutputType = {
    rent: number | null
    deposit: number | null
    maintenance: number | null
    sharing: number | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type PropertySumAggregateOutputType = {
    rent: number | null
    deposit: number | null
    maintenance: number | null
    sharing: number | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type PropertyMinAggregateOutputType = {
    id: string | null
    title: string | null
    propertyType: $Enums.PropertyType | null
    rent: number | null
    deposit: number | null
    maintenance: number | null
    sharing: number | null
    isAvailable: boolean | null
    genderPreference: $Enums.Gender | null
    bhk: $Enums.BHK | null
    addressLine1: string | null
    addressLine2: string | null
    locality: string | null
    city: string | null
    district: string | null
    state: string | null
    country: string | null
    postalCode: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    formattedAddress: string | null
    placeId: string | null
    ownerId: string | null
    ownerPhone: string | null
    visitingHrs: string | null
    availableFrom: Date | null
    ownershipProof: string | null
    verifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    verificationStatus: $Enums.PropertyVerificationStatus | null
  }

  export type PropertyMaxAggregateOutputType = {
    id: string | null
    title: string | null
    propertyType: $Enums.PropertyType | null
    rent: number | null
    deposit: number | null
    maintenance: number | null
    sharing: number | null
    isAvailable: boolean | null
    genderPreference: $Enums.Gender | null
    bhk: $Enums.BHK | null
    addressLine1: string | null
    addressLine2: string | null
    locality: string | null
    city: string | null
    district: string | null
    state: string | null
    country: string | null
    postalCode: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    formattedAddress: string | null
    placeId: string | null
    ownerId: string | null
    ownerPhone: string | null
    visitingHrs: string | null
    availableFrom: Date | null
    ownershipProof: string | null
    verifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    verificationStatus: $Enums.PropertyVerificationStatus | null
  }

  export type PropertyCountAggregateOutputType = {
    id: number
    title: number
    propertyType: number
    rent: number
    deposit: number
    maintenance: number
    sharing: number
    isAvailable: number
    genderPreference: number
    bhk: number
    suitableFitFor: number
    addressLine1: number
    addressLine2: number
    locality: number
    city: number
    district: number
    state: number
    country: number
    postalCode: number
    latitude: number
    longitude: number
    formattedAddress: number
    placeId: number
    ownerId: number
    ownerPhone: number
    visitingHrs: number
    availableFrom: number
    ownershipProof: number
    verifiedAt: number
    amenities: number
    rules: number
    images: number
    createdAt: number
    updatedAt: number
    verificationStatus: number
    _all: number
  }


  export type PropertyAvgAggregateInputType = {
    rent?: true
    deposit?: true
    maintenance?: true
    sharing?: true
    latitude?: true
    longitude?: true
  }

  export type PropertySumAggregateInputType = {
    rent?: true
    deposit?: true
    maintenance?: true
    sharing?: true
    latitude?: true
    longitude?: true
  }

  export type PropertyMinAggregateInputType = {
    id?: true
    title?: true
    propertyType?: true
    rent?: true
    deposit?: true
    maintenance?: true
    sharing?: true
    isAvailable?: true
    genderPreference?: true
    bhk?: true
    addressLine1?: true
    addressLine2?: true
    locality?: true
    city?: true
    district?: true
    state?: true
    country?: true
    postalCode?: true
    latitude?: true
    longitude?: true
    formattedAddress?: true
    placeId?: true
    ownerId?: true
    ownerPhone?: true
    visitingHrs?: true
    availableFrom?: true
    ownershipProof?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
    verificationStatus?: true
  }

  export type PropertyMaxAggregateInputType = {
    id?: true
    title?: true
    propertyType?: true
    rent?: true
    deposit?: true
    maintenance?: true
    sharing?: true
    isAvailable?: true
    genderPreference?: true
    bhk?: true
    addressLine1?: true
    addressLine2?: true
    locality?: true
    city?: true
    district?: true
    state?: true
    country?: true
    postalCode?: true
    latitude?: true
    longitude?: true
    formattedAddress?: true
    placeId?: true
    ownerId?: true
    ownerPhone?: true
    visitingHrs?: true
    availableFrom?: true
    ownershipProof?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
    verificationStatus?: true
  }

  export type PropertyCountAggregateInputType = {
    id?: true
    title?: true
    propertyType?: true
    rent?: true
    deposit?: true
    maintenance?: true
    sharing?: true
    isAvailable?: true
    genderPreference?: true
    bhk?: true
    suitableFitFor?: true
    addressLine1?: true
    addressLine2?: true
    locality?: true
    city?: true
    district?: true
    state?: true
    country?: true
    postalCode?: true
    latitude?: true
    longitude?: true
    formattedAddress?: true
    placeId?: true
    ownerId?: true
    ownerPhone?: true
    visitingHrs?: true
    availableFrom?: true
    ownershipProof?: true
    verifiedAt?: true
    amenities?: true
    rules?: true
    images?: true
    createdAt?: true
    updatedAt?: true
    verificationStatus?: true
    _all?: true
  }

  export type PropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Property to aggregate.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Properties
    **/
    _count?: true | PropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyMaxAggregateInputType
  }

  export type GetPropertyAggregateType<T extends PropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty[P]>
      : GetScalarType<T[P], AggregateProperty[P]>
  }




  export type PropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithAggregationInput | PropertyOrderByWithAggregationInput[]
    by: PropertyScalarFieldEnum[] | PropertyScalarFieldEnum
    having?: PropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyCountAggregateInputType | true
    _avg?: PropertyAvgAggregateInputType
    _sum?: PropertySumAggregateInputType
    _min?: PropertyMinAggregateInputType
    _max?: PropertyMaxAggregateInputType
  }

  export type PropertyGroupByOutputType = {
    id: string
    title: string
    propertyType: $Enums.PropertyType
    rent: number
    deposit: number
    maintenance: number
    sharing: number
    isAvailable: boolean
    genderPreference: $Enums.Gender
    bhk: $Enums.BHK
    suitableFitFor: string[]
    addressLine1: string
    addressLine2: string | null
    locality: string
    city: string
    district: string
    state: string
    country: string
    postalCode: string
    latitude: Decimal
    longitude: Decimal
    formattedAddress: string | null
    placeId: string | null
    ownerId: string
    ownerPhone: string
    visitingHrs: string | null
    availableFrom: Date | null
    ownershipProof: string | null
    verifiedAt: Date | null
    amenities: $Enums.AmenityType[]
    rules: JsonValue | null
    images: string[]
    createdAt: Date
    updatedAt: Date
    verificationStatus: $Enums.PropertyVerificationStatus
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  type GetPropertyGroupByPayload<T extends PropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyGroupByOutputType[P]>
        }
      >
    >


  export type PropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    propertyType?: boolean
    rent?: boolean
    deposit?: boolean
    maintenance?: boolean
    sharing?: boolean
    isAvailable?: boolean
    genderPreference?: boolean
    bhk?: boolean
    suitableFitFor?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    locality?: boolean
    city?: boolean
    district?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    latitude?: boolean
    longitude?: boolean
    formattedAddress?: boolean
    placeId?: boolean
    ownerId?: boolean
    ownerPhone?: boolean
    visitingHrs?: boolean
    availableFrom?: boolean
    ownershipProof?: boolean
    verifiedAt?: boolean
    amenities?: boolean
    rules?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    verificationStatus?: boolean
    PropertyStats?: boolean | Property$PropertyStatsArgs<ExtArgs>
    SavedProperty?: boolean | Property$SavedPropertyArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    propertyType?: boolean
    rent?: boolean
    deposit?: boolean
    maintenance?: boolean
    sharing?: boolean
    isAvailable?: boolean
    genderPreference?: boolean
    bhk?: boolean
    suitableFitFor?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    locality?: boolean
    city?: boolean
    district?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    latitude?: boolean
    longitude?: boolean
    formattedAddress?: boolean
    placeId?: boolean
    ownerId?: boolean
    ownerPhone?: boolean
    visitingHrs?: boolean
    availableFrom?: boolean
    ownershipProof?: boolean
    verifiedAt?: boolean
    amenities?: boolean
    rules?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    verificationStatus?: boolean
  }, ExtArgs["result"]["property"]>

  export type PropertySelectScalar = {
    id?: boolean
    title?: boolean
    propertyType?: boolean
    rent?: boolean
    deposit?: boolean
    maintenance?: boolean
    sharing?: boolean
    isAvailable?: boolean
    genderPreference?: boolean
    bhk?: boolean
    suitableFitFor?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    locality?: boolean
    city?: boolean
    district?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    latitude?: boolean
    longitude?: boolean
    formattedAddress?: boolean
    placeId?: boolean
    ownerId?: boolean
    ownerPhone?: boolean
    visitingHrs?: boolean
    availableFrom?: boolean
    ownershipProof?: boolean
    verifiedAt?: boolean
    amenities?: boolean
    rules?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    verificationStatus?: boolean
  }

  export type PropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PropertyStats?: boolean | Property$PropertyStatsArgs<ExtArgs>
    SavedProperty?: boolean | Property$SavedPropertyArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property"
    objects: {
      PropertyStats: Prisma.$PropertyStatsPayload<ExtArgs> | null
      SavedProperty: Prisma.$SavedPropertyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      propertyType: $Enums.PropertyType
      rent: number
      deposit: number
      maintenance: number
      sharing: number
      isAvailable: boolean
      genderPreference: $Enums.Gender
      bhk: $Enums.BHK
      suitableFitFor: string[]
      addressLine1: string
      addressLine2: string | null
      locality: string
      city: string
      district: string
      state: string
      country: string
      postalCode: string
      latitude: Prisma.Decimal
      longitude: Prisma.Decimal
      formattedAddress: string | null
      placeId: string | null
      ownerId: string
      ownerPhone: string
      visitingHrs: string | null
      availableFrom: Date | null
      ownershipProof: string | null
      verifiedAt: Date | null
      amenities: $Enums.AmenityType[]
      rules: Prisma.JsonValue | null
      images: string[]
      createdAt: Date
      updatedAt: Date
      verificationStatus: $Enums.PropertyVerificationStatus
    }, ExtArgs["result"]["property"]>
    composites: {}
  }

  type PropertyGetPayload<S extends boolean | null | undefined | PropertyDefaultArgs> = $Result.GetResult<Prisma.$PropertyPayload, S>

  type PropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PropertyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PropertyCountAggregateInputType | true
    }

  export interface PropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Property'], meta: { name: 'Property' } }
    /**
     * Find zero or one Property that matches the filter.
     * @param {PropertyFindUniqueArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyFindUniqueArgs>(args: SelectSubset<T, PropertyFindUniqueArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Property that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PropertyFindUniqueOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Property that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyFindFirstArgs>(args?: SelectSubset<T, PropertyFindFirstArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Property that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Properties
     * const properties = await prisma.property.findMany()
     * 
     * // Get first 10 Properties
     * const properties = await prisma.property.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyWithIdOnly = await prisma.property.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyFindManyArgs>(args?: SelectSubset<T, PropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Property.
     * @param {PropertyCreateArgs} args - Arguments to create a Property.
     * @example
     * // Create one Property
     * const Property = await prisma.property.create({
     *   data: {
     *     // ... data to create a Property
     *   }
     * })
     * 
     */
    create<T extends PropertyCreateArgs>(args: SelectSubset<T, PropertyCreateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Properties.
     * @param {PropertyCreateManyArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyCreateManyArgs>(args?: SelectSubset<T, PropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Properties and returns the data saved in the database.
     * @param {PropertyCreateManyAndReturnArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Property.
     * @param {PropertyDeleteArgs} args - Arguments to delete one Property.
     * @example
     * // Delete one Property
     * const Property = await prisma.property.delete({
     *   where: {
     *     // ... filter to delete one Property
     *   }
     * })
     * 
     */
    delete<T extends PropertyDeleteArgs>(args: SelectSubset<T, PropertyDeleteArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Property.
     * @param {PropertyUpdateArgs} args - Arguments to update one Property.
     * @example
     * // Update one Property
     * const property = await prisma.property.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyUpdateArgs>(args: SelectSubset<T, PropertyUpdateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Properties.
     * @param {PropertyDeleteManyArgs} args - Arguments to filter Properties to delete.
     * @example
     * // Delete a few Properties
     * const { count } = await prisma.property.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDeleteManyArgs>(args?: SelectSubset<T, PropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyUpdateManyArgs>(args: SelectSubset<T, PropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Property.
     * @param {PropertyUpsertArgs} args - Arguments to update or create a Property.
     * @example
     * // Update or create a Property
     * const property = await prisma.property.upsert({
     *   create: {
     *     // ... data to create a Property
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Property we want to update
     *   }
     * })
     */
    upsert<T extends PropertyUpsertArgs>(args: SelectSubset<T, PropertyUpsertArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyCountArgs} args - Arguments to filter Properties to count.
     * @example
     * // Count the number of Properties
     * const count = await prisma.property.count({
     *   where: {
     *     // ... the filter for the Properties we want to count
     *   }
     * })
    **/
    count<T extends PropertyCountArgs>(
      args?: Subset<T, PropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertyAggregateArgs>(args: Subset<T, PropertyAggregateArgs>): Prisma.PrismaPromise<GetPropertyAggregateType<T>>

    /**
     * Group by Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyGroupByArgs['orderBy'] }
        : { orderBy?: PropertyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Property model
   */
  readonly fields: PropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Property.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    PropertyStats<T extends Property$PropertyStatsArgs<ExtArgs> = {}>(args?: Subset<T, Property$PropertyStatsArgs<ExtArgs>>): Prisma__PropertyStatsClient<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    SavedProperty<T extends Property$SavedPropertyArgs<ExtArgs> = {}>(args?: Subset<T, Property$SavedPropertyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Property model
   */ 
  interface PropertyFieldRefs {
    readonly id: FieldRef<"Property", 'String'>
    readonly title: FieldRef<"Property", 'String'>
    readonly propertyType: FieldRef<"Property", 'PropertyType'>
    readonly rent: FieldRef<"Property", 'Int'>
    readonly deposit: FieldRef<"Property", 'Int'>
    readonly maintenance: FieldRef<"Property", 'Int'>
    readonly sharing: FieldRef<"Property", 'Int'>
    readonly isAvailable: FieldRef<"Property", 'Boolean'>
    readonly genderPreference: FieldRef<"Property", 'Gender'>
    readonly bhk: FieldRef<"Property", 'BHK'>
    readonly suitableFitFor: FieldRef<"Property", 'String[]'>
    readonly addressLine1: FieldRef<"Property", 'String'>
    readonly addressLine2: FieldRef<"Property", 'String'>
    readonly locality: FieldRef<"Property", 'String'>
    readonly city: FieldRef<"Property", 'String'>
    readonly district: FieldRef<"Property", 'String'>
    readonly state: FieldRef<"Property", 'String'>
    readonly country: FieldRef<"Property", 'String'>
    readonly postalCode: FieldRef<"Property", 'String'>
    readonly latitude: FieldRef<"Property", 'Decimal'>
    readonly longitude: FieldRef<"Property", 'Decimal'>
    readonly formattedAddress: FieldRef<"Property", 'String'>
    readonly placeId: FieldRef<"Property", 'String'>
    readonly ownerId: FieldRef<"Property", 'String'>
    readonly ownerPhone: FieldRef<"Property", 'String'>
    readonly visitingHrs: FieldRef<"Property", 'String'>
    readonly availableFrom: FieldRef<"Property", 'DateTime'>
    readonly ownershipProof: FieldRef<"Property", 'String'>
    readonly verifiedAt: FieldRef<"Property", 'DateTime'>
    readonly amenities: FieldRef<"Property", 'AmenityType[]'>
    readonly rules: FieldRef<"Property", 'Json'>
    readonly images: FieldRef<"Property", 'String[]'>
    readonly createdAt: FieldRef<"Property", 'DateTime'>
    readonly updatedAt: FieldRef<"Property", 'DateTime'>
    readonly verificationStatus: FieldRef<"Property", 'PropertyVerificationStatus'>
  }
    

  // Custom InputTypes
  /**
   * Property findUnique
   */
  export type PropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findUniqueOrThrow
   */
  export type PropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findFirst
   */
  export type PropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findFirstOrThrow
   */
  export type PropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findMany
   */
  export type PropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Properties to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property create
   */
  export type PropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a Property.
     */
    data: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
  }

  /**
   * Property createMany
   */
  export type PropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property createManyAndReturn
   */
  export type PropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property update
   */
  export type PropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a Property.
     */
    data: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
    /**
     * Choose, which Property to update.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property updateMany
   */
  export type PropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
  }

  /**
   * Property upsert
   */
  export type PropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the Property to update in case it exists.
     */
    where: PropertyWhereUniqueInput
    /**
     * In case the Property found by the `where` argument doesn't exist, create a new Property with this data.
     */
    create: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
    /**
     * In case the Property was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
  }

  /**
   * Property delete
   */
  export type PropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter which Property to delete.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property deleteMany
   */
  export type PropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properties to delete
     */
    where?: PropertyWhereInput
  }

  /**
   * Property.PropertyStats
   */
  export type Property$PropertyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
    where?: PropertyStatsWhereInput
  }

  /**
   * Property.SavedProperty
   */
  export type Property$SavedPropertyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
    where?: SavedPropertyWhereInput
    orderBy?: SavedPropertyOrderByWithRelationInput | SavedPropertyOrderByWithRelationInput[]
    cursor?: SavedPropertyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedPropertyScalarFieldEnum | SavedPropertyScalarFieldEnum[]
  }

  /**
   * Property without action
   */
  export type PropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
  }


  /**
   * Model PropertyStats
   */

  export type AggregatePropertyStats = {
    _count: PropertyStatsCountAggregateOutputType | null
    _avg: PropertyStatsAvgAggregateOutputType | null
    _sum: PropertyStatsSumAggregateOutputType | null
    _min: PropertyStatsMinAggregateOutputType | null
    _max: PropertyStatsMaxAggregateOutputType | null
  }

  export type PropertyStatsAvgAggregateOutputType = {
    viewCount: number | null
    saveCount: number | null
  }

  export type PropertyStatsSumAggregateOutputType = {
    viewCount: number | null
    saveCount: number | null
  }

  export type PropertyStatsMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    viewCount: number | null
    saveCount: number | null
  }

  export type PropertyStatsMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    viewCount: number | null
    saveCount: number | null
  }

  export type PropertyStatsCountAggregateOutputType = {
    id: number
    propertyId: number
    viewCount: number
    saveCount: number
    _all: number
  }


  export type PropertyStatsAvgAggregateInputType = {
    viewCount?: true
    saveCount?: true
  }

  export type PropertyStatsSumAggregateInputType = {
    viewCount?: true
    saveCount?: true
  }

  export type PropertyStatsMinAggregateInputType = {
    id?: true
    propertyId?: true
    viewCount?: true
    saveCount?: true
  }

  export type PropertyStatsMaxAggregateInputType = {
    id?: true
    propertyId?: true
    viewCount?: true
    saveCount?: true
  }

  export type PropertyStatsCountAggregateInputType = {
    id?: true
    propertyId?: true
    viewCount?: true
    saveCount?: true
    _all?: true
  }

  export type PropertyStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyStats to aggregate.
     */
    where?: PropertyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyStats to fetch.
     */
    orderBy?: PropertyStatsOrderByWithRelationInput | PropertyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyStats
    **/
    _count?: true | PropertyStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertyStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyStatsMaxAggregateInputType
  }

  export type GetPropertyStatsAggregateType<T extends PropertyStatsAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyStats[P]>
      : GetScalarType<T[P], AggregatePropertyStats[P]>
  }




  export type PropertyStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyStatsWhereInput
    orderBy?: PropertyStatsOrderByWithAggregationInput | PropertyStatsOrderByWithAggregationInput[]
    by: PropertyStatsScalarFieldEnum[] | PropertyStatsScalarFieldEnum
    having?: PropertyStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyStatsCountAggregateInputType | true
    _avg?: PropertyStatsAvgAggregateInputType
    _sum?: PropertyStatsSumAggregateInputType
    _min?: PropertyStatsMinAggregateInputType
    _max?: PropertyStatsMaxAggregateInputType
  }

  export type PropertyStatsGroupByOutputType = {
    id: string
    propertyId: string
    viewCount: number
    saveCount: number
    _count: PropertyStatsCountAggregateOutputType | null
    _avg: PropertyStatsAvgAggregateOutputType | null
    _sum: PropertyStatsSumAggregateOutputType | null
    _min: PropertyStatsMinAggregateOutputType | null
    _max: PropertyStatsMaxAggregateOutputType | null
  }

  type GetPropertyStatsGroupByPayload<T extends PropertyStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyStatsGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyStatsGroupByOutputType[P]>
        }
      >
    >


  export type PropertyStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    viewCount?: boolean
    saveCount?: boolean
    Property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyStats"]>

  export type PropertyStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    viewCount?: boolean
    saveCount?: boolean
    Property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyStats"]>

  export type PropertyStatsSelectScalar = {
    id?: boolean
    propertyId?: boolean
    viewCount?: boolean
    saveCount?: boolean
  }

  export type PropertyStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PropertyStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $PropertyStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyStats"
    objects: {
      Property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      viewCount: number
      saveCount: number
    }, ExtArgs["result"]["propertyStats"]>
    composites: {}
  }

  type PropertyStatsGetPayload<S extends boolean | null | undefined | PropertyStatsDefaultArgs> = $Result.GetResult<Prisma.$PropertyStatsPayload, S>

  type PropertyStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PropertyStatsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PropertyStatsCountAggregateInputType | true
    }

  export interface PropertyStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyStats'], meta: { name: 'PropertyStats' } }
    /**
     * Find zero or one PropertyStats that matches the filter.
     * @param {PropertyStatsFindUniqueArgs} args - Arguments to find a PropertyStats
     * @example
     * // Get one PropertyStats
     * const propertyStats = await prisma.propertyStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyStatsFindUniqueArgs>(args: SelectSubset<T, PropertyStatsFindUniqueArgs<ExtArgs>>): Prisma__PropertyStatsClient<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PropertyStats that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PropertyStatsFindUniqueOrThrowArgs} args - Arguments to find a PropertyStats
     * @example
     * // Get one PropertyStats
     * const propertyStats = await prisma.propertyStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyStatsClient<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PropertyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyStatsFindFirstArgs} args - Arguments to find a PropertyStats
     * @example
     * // Get one PropertyStats
     * const propertyStats = await prisma.propertyStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyStatsFindFirstArgs>(args?: SelectSubset<T, PropertyStatsFindFirstArgs<ExtArgs>>): Prisma__PropertyStatsClient<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PropertyStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyStatsFindFirstOrThrowArgs} args - Arguments to find a PropertyStats
     * @example
     * // Get one PropertyStats
     * const propertyStats = await prisma.propertyStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyStatsClient<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PropertyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyStats
     * const propertyStats = await prisma.propertyStats.findMany()
     * 
     * // Get first 10 PropertyStats
     * const propertyStats = await prisma.propertyStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyStatsWithIdOnly = await prisma.propertyStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyStatsFindManyArgs>(args?: SelectSubset<T, PropertyStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PropertyStats.
     * @param {PropertyStatsCreateArgs} args - Arguments to create a PropertyStats.
     * @example
     * // Create one PropertyStats
     * const PropertyStats = await prisma.propertyStats.create({
     *   data: {
     *     // ... data to create a PropertyStats
     *   }
     * })
     * 
     */
    create<T extends PropertyStatsCreateArgs>(args: SelectSubset<T, PropertyStatsCreateArgs<ExtArgs>>): Prisma__PropertyStatsClient<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PropertyStats.
     * @param {PropertyStatsCreateManyArgs} args - Arguments to create many PropertyStats.
     * @example
     * // Create many PropertyStats
     * const propertyStats = await prisma.propertyStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyStatsCreateManyArgs>(args?: SelectSubset<T, PropertyStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyStats and returns the data saved in the database.
     * @param {PropertyStatsCreateManyAndReturnArgs} args - Arguments to create many PropertyStats.
     * @example
     * // Create many PropertyStats
     * const propertyStats = await prisma.propertyStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyStats and only return the `id`
     * const propertyStatsWithIdOnly = await prisma.propertyStats.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PropertyStats.
     * @param {PropertyStatsDeleteArgs} args - Arguments to delete one PropertyStats.
     * @example
     * // Delete one PropertyStats
     * const PropertyStats = await prisma.propertyStats.delete({
     *   where: {
     *     // ... filter to delete one PropertyStats
     *   }
     * })
     * 
     */
    delete<T extends PropertyStatsDeleteArgs>(args: SelectSubset<T, PropertyStatsDeleteArgs<ExtArgs>>): Prisma__PropertyStatsClient<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PropertyStats.
     * @param {PropertyStatsUpdateArgs} args - Arguments to update one PropertyStats.
     * @example
     * // Update one PropertyStats
     * const propertyStats = await prisma.propertyStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyStatsUpdateArgs>(args: SelectSubset<T, PropertyStatsUpdateArgs<ExtArgs>>): Prisma__PropertyStatsClient<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PropertyStats.
     * @param {PropertyStatsDeleteManyArgs} args - Arguments to filter PropertyStats to delete.
     * @example
     * // Delete a few PropertyStats
     * const { count } = await prisma.propertyStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyStatsDeleteManyArgs>(args?: SelectSubset<T, PropertyStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyStats
     * const propertyStats = await prisma.propertyStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyStatsUpdateManyArgs>(args: SelectSubset<T, PropertyStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PropertyStats.
     * @param {PropertyStatsUpsertArgs} args - Arguments to update or create a PropertyStats.
     * @example
     * // Update or create a PropertyStats
     * const propertyStats = await prisma.propertyStats.upsert({
     *   create: {
     *     // ... data to create a PropertyStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyStats we want to update
     *   }
     * })
     */
    upsert<T extends PropertyStatsUpsertArgs>(args: SelectSubset<T, PropertyStatsUpsertArgs<ExtArgs>>): Prisma__PropertyStatsClient<$Result.GetResult<Prisma.$PropertyStatsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PropertyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyStatsCountArgs} args - Arguments to filter PropertyStats to count.
     * @example
     * // Count the number of PropertyStats
     * const count = await prisma.propertyStats.count({
     *   where: {
     *     // ... the filter for the PropertyStats we want to count
     *   }
     * })
    **/
    count<T extends PropertyStatsCountArgs>(
      args?: Subset<T, PropertyStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertyStatsAggregateArgs>(args: Subset<T, PropertyStatsAggregateArgs>): Prisma.PrismaPromise<GetPropertyStatsAggregateType<T>>

    /**
     * Group by PropertyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PropertyStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyStatsGroupByArgs['orderBy'] }
        : { orderBy?: PropertyStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PropertyStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyStats model
   */
  readonly fields: PropertyStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PropertyStats model
   */ 
  interface PropertyStatsFieldRefs {
    readonly id: FieldRef<"PropertyStats", 'String'>
    readonly propertyId: FieldRef<"PropertyStats", 'String'>
    readonly viewCount: FieldRef<"PropertyStats", 'Int'>
    readonly saveCount: FieldRef<"PropertyStats", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PropertyStats findUnique
   */
  export type PropertyStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
    /**
     * Filter, which PropertyStats to fetch.
     */
    where: PropertyStatsWhereUniqueInput
  }

  /**
   * PropertyStats findUniqueOrThrow
   */
  export type PropertyStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
    /**
     * Filter, which PropertyStats to fetch.
     */
    where: PropertyStatsWhereUniqueInput
  }

  /**
   * PropertyStats findFirst
   */
  export type PropertyStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
    /**
     * Filter, which PropertyStats to fetch.
     */
    where?: PropertyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyStats to fetch.
     */
    orderBy?: PropertyStatsOrderByWithRelationInput | PropertyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyStats.
     */
    cursor?: PropertyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyStats.
     */
    distinct?: PropertyStatsScalarFieldEnum | PropertyStatsScalarFieldEnum[]
  }

  /**
   * PropertyStats findFirstOrThrow
   */
  export type PropertyStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
    /**
     * Filter, which PropertyStats to fetch.
     */
    where?: PropertyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyStats to fetch.
     */
    orderBy?: PropertyStatsOrderByWithRelationInput | PropertyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyStats.
     */
    cursor?: PropertyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyStats.
     */
    distinct?: PropertyStatsScalarFieldEnum | PropertyStatsScalarFieldEnum[]
  }

  /**
   * PropertyStats findMany
   */
  export type PropertyStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
    /**
     * Filter, which PropertyStats to fetch.
     */
    where?: PropertyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyStats to fetch.
     */
    orderBy?: PropertyStatsOrderByWithRelationInput | PropertyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyStats.
     */
    cursor?: PropertyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyStats.
     */
    skip?: number
    distinct?: PropertyStatsScalarFieldEnum | PropertyStatsScalarFieldEnum[]
  }

  /**
   * PropertyStats create
   */
  export type PropertyStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyStats.
     */
    data: XOR<PropertyStatsCreateInput, PropertyStatsUncheckedCreateInput>
  }

  /**
   * PropertyStats createMany
   */
  export type PropertyStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyStats.
     */
    data: PropertyStatsCreateManyInput | PropertyStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyStats createManyAndReturn
   */
  export type PropertyStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PropertyStats.
     */
    data: PropertyStatsCreateManyInput | PropertyStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyStats update
   */
  export type PropertyStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyStats.
     */
    data: XOR<PropertyStatsUpdateInput, PropertyStatsUncheckedUpdateInput>
    /**
     * Choose, which PropertyStats to update.
     */
    where: PropertyStatsWhereUniqueInput
  }

  /**
   * PropertyStats updateMany
   */
  export type PropertyStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyStats.
     */
    data: XOR<PropertyStatsUpdateManyMutationInput, PropertyStatsUncheckedUpdateManyInput>
    /**
     * Filter which PropertyStats to update
     */
    where?: PropertyStatsWhereInput
  }

  /**
   * PropertyStats upsert
   */
  export type PropertyStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyStats to update in case it exists.
     */
    where: PropertyStatsWhereUniqueInput
    /**
     * In case the PropertyStats found by the `where` argument doesn't exist, create a new PropertyStats with this data.
     */
    create: XOR<PropertyStatsCreateInput, PropertyStatsUncheckedCreateInput>
    /**
     * In case the PropertyStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyStatsUpdateInput, PropertyStatsUncheckedUpdateInput>
  }

  /**
   * PropertyStats delete
   */
  export type PropertyStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
    /**
     * Filter which PropertyStats to delete.
     */
    where: PropertyStatsWhereUniqueInput
  }

  /**
   * PropertyStats deleteMany
   */
  export type PropertyStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyStats to delete
     */
    where?: PropertyStatsWhereInput
  }

  /**
   * PropertyStats without action
   */
  export type PropertyStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyStats
     */
    select?: PropertyStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyStatsInclude<ExtArgs> | null
  }


  /**
   * Model SavedProperty
   */

  export type AggregateSavedProperty = {
    _count: SavedPropertyCountAggregateOutputType | null
    _min: SavedPropertyMinAggregateOutputType | null
    _max: SavedPropertyMaxAggregateOutputType | null
  }

  export type SavedPropertyMinAggregateOutputType = {
    id: string | null
    userId: string | null
    propertyId: string | null
    savedAt: Date | null
  }

  export type SavedPropertyMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    propertyId: string | null
    savedAt: Date | null
  }

  export type SavedPropertyCountAggregateOutputType = {
    id: number
    userId: number
    propertyId: number
    savedAt: number
    _all: number
  }


  export type SavedPropertyMinAggregateInputType = {
    id?: true
    userId?: true
    propertyId?: true
    savedAt?: true
  }

  export type SavedPropertyMaxAggregateInputType = {
    id?: true
    userId?: true
    propertyId?: true
    savedAt?: true
  }

  export type SavedPropertyCountAggregateInputType = {
    id?: true
    userId?: true
    propertyId?: true
    savedAt?: true
    _all?: true
  }

  export type SavedPropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedProperty to aggregate.
     */
    where?: SavedPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProperties to fetch.
     */
    orderBy?: SavedPropertyOrderByWithRelationInput | SavedPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProperties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedProperties
    **/
    _count?: true | SavedPropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedPropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedPropertyMaxAggregateInputType
  }

  export type GetSavedPropertyAggregateType<T extends SavedPropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedProperty[P]>
      : GetScalarType<T[P], AggregateSavedProperty[P]>
  }




  export type SavedPropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedPropertyWhereInput
    orderBy?: SavedPropertyOrderByWithAggregationInput | SavedPropertyOrderByWithAggregationInput[]
    by: SavedPropertyScalarFieldEnum[] | SavedPropertyScalarFieldEnum
    having?: SavedPropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedPropertyCountAggregateInputType | true
    _min?: SavedPropertyMinAggregateInputType
    _max?: SavedPropertyMaxAggregateInputType
  }

  export type SavedPropertyGroupByOutputType = {
    id: string
    userId: string
    propertyId: string
    savedAt: Date
    _count: SavedPropertyCountAggregateOutputType | null
    _min: SavedPropertyMinAggregateOutputType | null
    _max: SavedPropertyMaxAggregateOutputType | null
  }

  type GetSavedPropertyGroupByPayload<T extends SavedPropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedPropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedPropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedPropertyGroupByOutputType[P]>
            : GetScalarType<T[P], SavedPropertyGroupByOutputType[P]>
        }
      >
    >


  export type SavedPropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    propertyId?: boolean
    savedAt?: boolean
    Property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedProperty"]>

  export type SavedPropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    propertyId?: boolean
    savedAt?: boolean
    Property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedProperty"]>

  export type SavedPropertySelectScalar = {
    id?: boolean
    userId?: boolean
    propertyId?: boolean
    savedAt?: boolean
  }

  export type SavedPropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type SavedPropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $SavedPropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedProperty"
    objects: {
      Property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      propertyId: string
      savedAt: Date
    }, ExtArgs["result"]["savedProperty"]>
    composites: {}
  }

  type SavedPropertyGetPayload<S extends boolean | null | undefined | SavedPropertyDefaultArgs> = $Result.GetResult<Prisma.$SavedPropertyPayload, S>

  type SavedPropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SavedPropertyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SavedPropertyCountAggregateInputType | true
    }

  export interface SavedPropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedProperty'], meta: { name: 'SavedProperty' } }
    /**
     * Find zero or one SavedProperty that matches the filter.
     * @param {SavedPropertyFindUniqueArgs} args - Arguments to find a SavedProperty
     * @example
     * // Get one SavedProperty
     * const savedProperty = await prisma.savedProperty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedPropertyFindUniqueArgs>(args: SelectSubset<T, SavedPropertyFindUniqueArgs<ExtArgs>>): Prisma__SavedPropertyClient<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SavedProperty that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SavedPropertyFindUniqueOrThrowArgs} args - Arguments to find a SavedProperty
     * @example
     * // Get one SavedProperty
     * const savedProperty = await prisma.savedProperty.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedPropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedPropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedPropertyClient<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SavedProperty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPropertyFindFirstArgs} args - Arguments to find a SavedProperty
     * @example
     * // Get one SavedProperty
     * const savedProperty = await prisma.savedProperty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedPropertyFindFirstArgs>(args?: SelectSubset<T, SavedPropertyFindFirstArgs<ExtArgs>>): Prisma__SavedPropertyClient<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SavedProperty that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPropertyFindFirstOrThrowArgs} args - Arguments to find a SavedProperty
     * @example
     * // Get one SavedProperty
     * const savedProperty = await prisma.savedProperty.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedPropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedPropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedPropertyClient<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SavedProperties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedProperties
     * const savedProperties = await prisma.savedProperty.findMany()
     * 
     * // Get first 10 SavedProperties
     * const savedProperties = await prisma.savedProperty.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedPropertyWithIdOnly = await prisma.savedProperty.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedPropertyFindManyArgs>(args?: SelectSubset<T, SavedPropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SavedProperty.
     * @param {SavedPropertyCreateArgs} args - Arguments to create a SavedProperty.
     * @example
     * // Create one SavedProperty
     * const SavedProperty = await prisma.savedProperty.create({
     *   data: {
     *     // ... data to create a SavedProperty
     *   }
     * })
     * 
     */
    create<T extends SavedPropertyCreateArgs>(args: SelectSubset<T, SavedPropertyCreateArgs<ExtArgs>>): Prisma__SavedPropertyClient<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SavedProperties.
     * @param {SavedPropertyCreateManyArgs} args - Arguments to create many SavedProperties.
     * @example
     * // Create many SavedProperties
     * const savedProperty = await prisma.savedProperty.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedPropertyCreateManyArgs>(args?: SelectSubset<T, SavedPropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedProperties and returns the data saved in the database.
     * @param {SavedPropertyCreateManyAndReturnArgs} args - Arguments to create many SavedProperties.
     * @example
     * // Create many SavedProperties
     * const savedProperty = await prisma.savedProperty.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedProperties and only return the `id`
     * const savedPropertyWithIdOnly = await prisma.savedProperty.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedPropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedPropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SavedProperty.
     * @param {SavedPropertyDeleteArgs} args - Arguments to delete one SavedProperty.
     * @example
     * // Delete one SavedProperty
     * const SavedProperty = await prisma.savedProperty.delete({
     *   where: {
     *     // ... filter to delete one SavedProperty
     *   }
     * })
     * 
     */
    delete<T extends SavedPropertyDeleteArgs>(args: SelectSubset<T, SavedPropertyDeleteArgs<ExtArgs>>): Prisma__SavedPropertyClient<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SavedProperty.
     * @param {SavedPropertyUpdateArgs} args - Arguments to update one SavedProperty.
     * @example
     * // Update one SavedProperty
     * const savedProperty = await prisma.savedProperty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedPropertyUpdateArgs>(args: SelectSubset<T, SavedPropertyUpdateArgs<ExtArgs>>): Prisma__SavedPropertyClient<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SavedProperties.
     * @param {SavedPropertyDeleteManyArgs} args - Arguments to filter SavedProperties to delete.
     * @example
     * // Delete a few SavedProperties
     * const { count } = await prisma.savedProperty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedPropertyDeleteManyArgs>(args?: SelectSubset<T, SavedPropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedProperties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedProperties
     * const savedProperty = await prisma.savedProperty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedPropertyUpdateManyArgs>(args: SelectSubset<T, SavedPropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SavedProperty.
     * @param {SavedPropertyUpsertArgs} args - Arguments to update or create a SavedProperty.
     * @example
     * // Update or create a SavedProperty
     * const savedProperty = await prisma.savedProperty.upsert({
     *   create: {
     *     // ... data to create a SavedProperty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedProperty we want to update
     *   }
     * })
     */
    upsert<T extends SavedPropertyUpsertArgs>(args: SelectSubset<T, SavedPropertyUpsertArgs<ExtArgs>>): Prisma__SavedPropertyClient<$Result.GetResult<Prisma.$SavedPropertyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SavedProperties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPropertyCountArgs} args - Arguments to filter SavedProperties to count.
     * @example
     * // Count the number of SavedProperties
     * const count = await prisma.savedProperty.count({
     *   where: {
     *     // ... the filter for the SavedProperties we want to count
     *   }
     * })
    **/
    count<T extends SavedPropertyCountArgs>(
      args?: Subset<T, SavedPropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedPropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedProperty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedPropertyAggregateArgs>(args: Subset<T, SavedPropertyAggregateArgs>): Prisma.PrismaPromise<GetSavedPropertyAggregateType<T>>

    /**
     * Group by SavedProperty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPropertyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedPropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedPropertyGroupByArgs['orderBy'] }
        : { orderBy?: SavedPropertyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedPropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedProperty model
   */
  readonly fields: SavedPropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedProperty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedPropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedProperty model
   */ 
  interface SavedPropertyFieldRefs {
    readonly id: FieldRef<"SavedProperty", 'String'>
    readonly userId: FieldRef<"SavedProperty", 'String'>
    readonly propertyId: FieldRef<"SavedProperty", 'String'>
    readonly savedAt: FieldRef<"SavedProperty", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SavedProperty findUnique
   */
  export type SavedPropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
    /**
     * Filter, which SavedProperty to fetch.
     */
    where: SavedPropertyWhereUniqueInput
  }

  /**
   * SavedProperty findUniqueOrThrow
   */
  export type SavedPropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
    /**
     * Filter, which SavedProperty to fetch.
     */
    where: SavedPropertyWhereUniqueInput
  }

  /**
   * SavedProperty findFirst
   */
  export type SavedPropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
    /**
     * Filter, which SavedProperty to fetch.
     */
    where?: SavedPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProperties to fetch.
     */
    orderBy?: SavedPropertyOrderByWithRelationInput | SavedPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedProperties.
     */
    cursor?: SavedPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProperties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedProperties.
     */
    distinct?: SavedPropertyScalarFieldEnum | SavedPropertyScalarFieldEnum[]
  }

  /**
   * SavedProperty findFirstOrThrow
   */
  export type SavedPropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
    /**
     * Filter, which SavedProperty to fetch.
     */
    where?: SavedPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProperties to fetch.
     */
    orderBy?: SavedPropertyOrderByWithRelationInput | SavedPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedProperties.
     */
    cursor?: SavedPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProperties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedProperties.
     */
    distinct?: SavedPropertyScalarFieldEnum | SavedPropertyScalarFieldEnum[]
  }

  /**
   * SavedProperty findMany
   */
  export type SavedPropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
    /**
     * Filter, which SavedProperties to fetch.
     */
    where?: SavedPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProperties to fetch.
     */
    orderBy?: SavedPropertyOrderByWithRelationInput | SavedPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedProperties.
     */
    cursor?: SavedPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProperties.
     */
    skip?: number
    distinct?: SavedPropertyScalarFieldEnum | SavedPropertyScalarFieldEnum[]
  }

  /**
   * SavedProperty create
   */
  export type SavedPropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedProperty.
     */
    data: XOR<SavedPropertyCreateInput, SavedPropertyUncheckedCreateInput>
  }

  /**
   * SavedProperty createMany
   */
  export type SavedPropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedProperties.
     */
    data: SavedPropertyCreateManyInput | SavedPropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedProperty createManyAndReturn
   */
  export type SavedPropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SavedProperties.
     */
    data: SavedPropertyCreateManyInput | SavedPropertyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedProperty update
   */
  export type SavedPropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedProperty.
     */
    data: XOR<SavedPropertyUpdateInput, SavedPropertyUncheckedUpdateInput>
    /**
     * Choose, which SavedProperty to update.
     */
    where: SavedPropertyWhereUniqueInput
  }

  /**
   * SavedProperty updateMany
   */
  export type SavedPropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedProperties.
     */
    data: XOR<SavedPropertyUpdateManyMutationInput, SavedPropertyUncheckedUpdateManyInput>
    /**
     * Filter which SavedProperties to update
     */
    where?: SavedPropertyWhereInput
  }

  /**
   * SavedProperty upsert
   */
  export type SavedPropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedProperty to update in case it exists.
     */
    where: SavedPropertyWhereUniqueInput
    /**
     * In case the SavedProperty found by the `where` argument doesn't exist, create a new SavedProperty with this data.
     */
    create: XOR<SavedPropertyCreateInput, SavedPropertyUncheckedCreateInput>
    /**
     * In case the SavedProperty was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedPropertyUpdateInput, SavedPropertyUncheckedUpdateInput>
  }

  /**
   * SavedProperty delete
   */
  export type SavedPropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
    /**
     * Filter which SavedProperty to delete.
     */
    where: SavedPropertyWhereUniqueInput
  }

  /**
   * SavedProperty deleteMany
   */
  export type SavedPropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedProperties to delete
     */
    where?: SavedPropertyWhereInput
  }

  /**
   * SavedProperty without action
   */
  export type SavedPropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProperty
     */
    select?: SavedPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPropertyInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PropertyScalarFieldEnum: {
    id: 'id',
    title: 'title',
    propertyType: 'propertyType',
    rent: 'rent',
    deposit: 'deposit',
    maintenance: 'maintenance',
    sharing: 'sharing',
    isAvailable: 'isAvailable',
    genderPreference: 'genderPreference',
    bhk: 'bhk',
    suitableFitFor: 'suitableFitFor',
    addressLine1: 'addressLine1',
    addressLine2: 'addressLine2',
    locality: 'locality',
    city: 'city',
    district: 'district',
    state: 'state',
    country: 'country',
    postalCode: 'postalCode',
    latitude: 'latitude',
    longitude: 'longitude',
    formattedAddress: 'formattedAddress',
    placeId: 'placeId',
    ownerId: 'ownerId',
    ownerPhone: 'ownerPhone',
    visitingHrs: 'visitingHrs',
    availableFrom: 'availableFrom',
    ownershipProof: 'ownershipProof',
    verifiedAt: 'verifiedAt',
    amenities: 'amenities',
    rules: 'rules',
    images: 'images',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    verificationStatus: 'verificationStatus'
  };

  export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum]


  export const PropertyStatsScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    viewCount: 'viewCount',
    saveCount: 'saveCount'
  };

  export type PropertyStatsScalarFieldEnum = (typeof PropertyStatsScalarFieldEnum)[keyof typeof PropertyStatsScalarFieldEnum]


  export const SavedPropertyScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    propertyId: 'propertyId',
    savedAt: 'savedAt'
  };

  export type SavedPropertyScalarFieldEnum = (typeof SavedPropertyScalarFieldEnum)[keyof typeof SavedPropertyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'PropertyType'
   */
  export type EnumPropertyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyType'>
    


  /**
   * Reference to a field of type 'PropertyType[]'
   */
  export type ListEnumPropertyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'BHK'
   */
  export type EnumBHKFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BHK'>
    


  /**
   * Reference to a field of type 'BHK[]'
   */
  export type ListEnumBHKFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BHK[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AmenityType[]'
   */
  export type ListEnumAmenityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AmenityType[]'>
    


  /**
   * Reference to a field of type 'AmenityType'
   */
  export type EnumAmenityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AmenityType'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'PropertyVerificationStatus'
   */
  export type EnumPropertyVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyVerificationStatus'>
    


  /**
   * Reference to a field of type 'PropertyVerificationStatus[]'
   */
  export type ListEnumPropertyVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyVerificationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PropertyWhereInput = {
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    id?: StringFilter<"Property"> | string
    title?: StringFilter<"Property"> | string
    propertyType?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType
    rent?: IntFilter<"Property"> | number
    deposit?: IntFilter<"Property"> | number
    maintenance?: IntFilter<"Property"> | number
    sharing?: IntFilter<"Property"> | number
    isAvailable?: BoolFilter<"Property"> | boolean
    genderPreference?: EnumGenderFilter<"Property"> | $Enums.Gender
    bhk?: EnumBHKFilter<"Property"> | $Enums.BHK
    suitableFitFor?: StringNullableListFilter<"Property">
    addressLine1?: StringFilter<"Property"> | string
    addressLine2?: StringNullableFilter<"Property"> | string | null
    locality?: StringFilter<"Property"> | string
    city?: StringFilter<"Property"> | string
    district?: StringFilter<"Property"> | string
    state?: StringFilter<"Property"> | string
    country?: StringFilter<"Property"> | string
    postalCode?: StringFilter<"Property"> | string
    latitude?: DecimalFilter<"Property"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"Property"> | Decimal | DecimalJsLike | number | string
    formattedAddress?: StringNullableFilter<"Property"> | string | null
    placeId?: StringNullableFilter<"Property"> | string | null
    ownerId?: StringFilter<"Property"> | string
    ownerPhone?: StringFilter<"Property"> | string
    visitingHrs?: StringNullableFilter<"Property"> | string | null
    availableFrom?: DateTimeNullableFilter<"Property"> | Date | string | null
    ownershipProof?: StringNullableFilter<"Property"> | string | null
    verifiedAt?: DateTimeNullableFilter<"Property"> | Date | string | null
    amenities?: EnumAmenityTypeNullableListFilter<"Property">
    rules?: JsonNullableFilter<"Property">
    images?: StringNullableListFilter<"Property">
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    verificationStatus?: EnumPropertyVerificationStatusFilter<"Property"> | $Enums.PropertyVerificationStatus
    PropertyStats?: XOR<PropertyStatsNullableRelationFilter, PropertyStatsWhereInput> | null
    SavedProperty?: SavedPropertyListRelationFilter
  }

  export type PropertyOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    propertyType?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    maintenance?: SortOrder
    sharing?: SortOrder
    isAvailable?: SortOrder
    genderPreference?: SortOrder
    bhk?: SortOrder
    suitableFitFor?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrderInput | SortOrder
    locality?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    formattedAddress?: SortOrderInput | SortOrder
    placeId?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    ownerPhone?: SortOrder
    visitingHrs?: SortOrderInput | SortOrder
    availableFrom?: SortOrderInput | SortOrder
    ownershipProof?: SortOrderInput | SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    amenities?: SortOrder
    rules?: SortOrderInput | SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    verificationStatus?: SortOrder
    PropertyStats?: PropertyStatsOrderByWithRelationInput
    SavedProperty?: SavedPropertyOrderByRelationAggregateInput
  }

  export type PropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    placeId?: string
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    title?: StringFilter<"Property"> | string
    propertyType?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType
    rent?: IntFilter<"Property"> | number
    deposit?: IntFilter<"Property"> | number
    maintenance?: IntFilter<"Property"> | number
    sharing?: IntFilter<"Property"> | number
    isAvailable?: BoolFilter<"Property"> | boolean
    genderPreference?: EnumGenderFilter<"Property"> | $Enums.Gender
    bhk?: EnumBHKFilter<"Property"> | $Enums.BHK
    suitableFitFor?: StringNullableListFilter<"Property">
    addressLine1?: StringFilter<"Property"> | string
    addressLine2?: StringNullableFilter<"Property"> | string | null
    locality?: StringFilter<"Property"> | string
    city?: StringFilter<"Property"> | string
    district?: StringFilter<"Property"> | string
    state?: StringFilter<"Property"> | string
    country?: StringFilter<"Property"> | string
    postalCode?: StringFilter<"Property"> | string
    latitude?: DecimalFilter<"Property"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"Property"> | Decimal | DecimalJsLike | number | string
    formattedAddress?: StringNullableFilter<"Property"> | string | null
    ownerId?: StringFilter<"Property"> | string
    ownerPhone?: StringFilter<"Property"> | string
    visitingHrs?: StringNullableFilter<"Property"> | string | null
    availableFrom?: DateTimeNullableFilter<"Property"> | Date | string | null
    ownershipProof?: StringNullableFilter<"Property"> | string | null
    verifiedAt?: DateTimeNullableFilter<"Property"> | Date | string | null
    amenities?: EnumAmenityTypeNullableListFilter<"Property">
    rules?: JsonNullableFilter<"Property">
    images?: StringNullableListFilter<"Property">
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    verificationStatus?: EnumPropertyVerificationStatusFilter<"Property"> | $Enums.PropertyVerificationStatus
    PropertyStats?: XOR<PropertyStatsNullableRelationFilter, PropertyStatsWhereInput> | null
    SavedProperty?: SavedPropertyListRelationFilter
  }, "id" | "placeId">

  export type PropertyOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    propertyType?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    maintenance?: SortOrder
    sharing?: SortOrder
    isAvailable?: SortOrder
    genderPreference?: SortOrder
    bhk?: SortOrder
    suitableFitFor?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrderInput | SortOrder
    locality?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    formattedAddress?: SortOrderInput | SortOrder
    placeId?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    ownerPhone?: SortOrder
    visitingHrs?: SortOrderInput | SortOrder
    availableFrom?: SortOrderInput | SortOrder
    ownershipProof?: SortOrderInput | SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    amenities?: SortOrder
    rules?: SortOrderInput | SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    verificationStatus?: SortOrder
    _count?: PropertyCountOrderByAggregateInput
    _avg?: PropertyAvgOrderByAggregateInput
    _max?: PropertyMaxOrderByAggregateInput
    _min?: PropertyMinOrderByAggregateInput
    _sum?: PropertySumOrderByAggregateInput
  }

  export type PropertyScalarWhereWithAggregatesInput = {
    AND?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    OR?: PropertyScalarWhereWithAggregatesInput[]
    NOT?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Property"> | string
    title?: StringWithAggregatesFilter<"Property"> | string
    propertyType?: EnumPropertyTypeWithAggregatesFilter<"Property"> | $Enums.PropertyType
    rent?: IntWithAggregatesFilter<"Property"> | number
    deposit?: IntWithAggregatesFilter<"Property"> | number
    maintenance?: IntWithAggregatesFilter<"Property"> | number
    sharing?: IntWithAggregatesFilter<"Property"> | number
    isAvailable?: BoolWithAggregatesFilter<"Property"> | boolean
    genderPreference?: EnumGenderWithAggregatesFilter<"Property"> | $Enums.Gender
    bhk?: EnumBHKWithAggregatesFilter<"Property"> | $Enums.BHK
    suitableFitFor?: StringNullableListFilter<"Property">
    addressLine1?: StringWithAggregatesFilter<"Property"> | string
    addressLine2?: StringNullableWithAggregatesFilter<"Property"> | string | null
    locality?: StringWithAggregatesFilter<"Property"> | string
    city?: StringWithAggregatesFilter<"Property"> | string
    district?: StringWithAggregatesFilter<"Property"> | string
    state?: StringWithAggregatesFilter<"Property"> | string
    country?: StringWithAggregatesFilter<"Property"> | string
    postalCode?: StringWithAggregatesFilter<"Property"> | string
    latitude?: DecimalWithAggregatesFilter<"Property"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalWithAggregatesFilter<"Property"> | Decimal | DecimalJsLike | number | string
    formattedAddress?: StringNullableWithAggregatesFilter<"Property"> | string | null
    placeId?: StringNullableWithAggregatesFilter<"Property"> | string | null
    ownerId?: StringWithAggregatesFilter<"Property"> | string
    ownerPhone?: StringWithAggregatesFilter<"Property"> | string
    visitingHrs?: StringNullableWithAggregatesFilter<"Property"> | string | null
    availableFrom?: DateTimeNullableWithAggregatesFilter<"Property"> | Date | string | null
    ownershipProof?: StringNullableWithAggregatesFilter<"Property"> | string | null
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"Property"> | Date | string | null
    amenities?: EnumAmenityTypeNullableListFilter<"Property">
    rules?: JsonNullableWithAggregatesFilter<"Property">
    images?: StringNullableListFilter<"Property">
    createdAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
    verificationStatus?: EnumPropertyVerificationStatusWithAggregatesFilter<"Property"> | $Enums.PropertyVerificationStatus
  }

  export type PropertyStatsWhereInput = {
    AND?: PropertyStatsWhereInput | PropertyStatsWhereInput[]
    OR?: PropertyStatsWhereInput[]
    NOT?: PropertyStatsWhereInput | PropertyStatsWhereInput[]
    id?: StringFilter<"PropertyStats"> | string
    propertyId?: StringFilter<"PropertyStats"> | string
    viewCount?: IntFilter<"PropertyStats"> | number
    saveCount?: IntFilter<"PropertyStats"> | number
    Property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type PropertyStatsOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    viewCount?: SortOrder
    saveCount?: SortOrder
    Property?: PropertyOrderByWithRelationInput
  }

  export type PropertyStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    propertyId?: string
    AND?: PropertyStatsWhereInput | PropertyStatsWhereInput[]
    OR?: PropertyStatsWhereInput[]
    NOT?: PropertyStatsWhereInput | PropertyStatsWhereInput[]
    viewCount?: IntFilter<"PropertyStats"> | number
    saveCount?: IntFilter<"PropertyStats"> | number
    Property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id" | "propertyId">

  export type PropertyStatsOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    viewCount?: SortOrder
    saveCount?: SortOrder
    _count?: PropertyStatsCountOrderByAggregateInput
    _avg?: PropertyStatsAvgOrderByAggregateInput
    _max?: PropertyStatsMaxOrderByAggregateInput
    _min?: PropertyStatsMinOrderByAggregateInput
    _sum?: PropertyStatsSumOrderByAggregateInput
  }

  export type PropertyStatsScalarWhereWithAggregatesInput = {
    AND?: PropertyStatsScalarWhereWithAggregatesInput | PropertyStatsScalarWhereWithAggregatesInput[]
    OR?: PropertyStatsScalarWhereWithAggregatesInput[]
    NOT?: PropertyStatsScalarWhereWithAggregatesInput | PropertyStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PropertyStats"> | string
    propertyId?: StringWithAggregatesFilter<"PropertyStats"> | string
    viewCount?: IntWithAggregatesFilter<"PropertyStats"> | number
    saveCount?: IntWithAggregatesFilter<"PropertyStats"> | number
  }

  export type SavedPropertyWhereInput = {
    AND?: SavedPropertyWhereInput | SavedPropertyWhereInput[]
    OR?: SavedPropertyWhereInput[]
    NOT?: SavedPropertyWhereInput | SavedPropertyWhereInput[]
    id?: StringFilter<"SavedProperty"> | string
    userId?: StringFilter<"SavedProperty"> | string
    propertyId?: StringFilter<"SavedProperty"> | string
    savedAt?: DateTimeFilter<"SavedProperty"> | Date | string
    Property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type SavedPropertyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    savedAt?: SortOrder
    Property?: PropertyOrderByWithRelationInput
  }

  export type SavedPropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_propertyId?: SavedPropertyUserIdPropertyIdCompoundUniqueInput
    AND?: SavedPropertyWhereInput | SavedPropertyWhereInput[]
    OR?: SavedPropertyWhereInput[]
    NOT?: SavedPropertyWhereInput | SavedPropertyWhereInput[]
    userId?: StringFilter<"SavedProperty"> | string
    propertyId?: StringFilter<"SavedProperty"> | string
    savedAt?: DateTimeFilter<"SavedProperty"> | Date | string
    Property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id" | "userId_propertyId">

  export type SavedPropertyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    savedAt?: SortOrder
    _count?: SavedPropertyCountOrderByAggregateInput
    _max?: SavedPropertyMaxOrderByAggregateInput
    _min?: SavedPropertyMinOrderByAggregateInput
  }

  export type SavedPropertyScalarWhereWithAggregatesInput = {
    AND?: SavedPropertyScalarWhereWithAggregatesInput | SavedPropertyScalarWhereWithAggregatesInput[]
    OR?: SavedPropertyScalarWhereWithAggregatesInput[]
    NOT?: SavedPropertyScalarWhereWithAggregatesInput | SavedPropertyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SavedProperty"> | string
    userId?: StringWithAggregatesFilter<"SavedProperty"> | string
    propertyId?: StringWithAggregatesFilter<"SavedProperty"> | string
    savedAt?: DateTimeWithAggregatesFilter<"SavedProperty"> | Date | string
  }

  export type PropertyCreateInput = {
    id?: string
    title: string
    propertyType: $Enums.PropertyType
    rent: number
    deposit: number
    maintenance: number
    sharing: number
    isAvailable?: boolean
    genderPreference: $Enums.Gender
    bhk: $Enums.BHK
    suitableFitFor?: PropertyCreatesuitableFitForInput | string[]
    addressLine1: string
    addressLine2?: string | null
    locality: string
    city: string
    district: string
    state: string
    country: string
    postalCode: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    formattedAddress?: string | null
    placeId?: string | null
    ownerId: string
    ownerPhone: string
    visitingHrs?: string | null
    availableFrom?: Date | string | null
    ownershipProof?: string | null
    verifiedAt?: Date | string | null
    amenities?: PropertyCreateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    verificationStatus?: $Enums.PropertyVerificationStatus
    PropertyStats?: PropertyStatsCreateNestedOneWithoutPropertyInput
    SavedProperty?: SavedPropertyCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateInput = {
    id?: string
    title: string
    propertyType: $Enums.PropertyType
    rent: number
    deposit: number
    maintenance: number
    sharing: number
    isAvailable?: boolean
    genderPreference: $Enums.Gender
    bhk: $Enums.BHK
    suitableFitFor?: PropertyCreatesuitableFitForInput | string[]
    addressLine1: string
    addressLine2?: string | null
    locality: string
    city: string
    district: string
    state: string
    country: string
    postalCode: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    formattedAddress?: string | null
    placeId?: string | null
    ownerId: string
    ownerPhone: string
    visitingHrs?: string | null
    availableFrom?: Date | string | null
    ownershipProof?: string | null
    verifiedAt?: Date | string | null
    amenities?: PropertyCreateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    verificationStatus?: $Enums.PropertyVerificationStatus
    PropertyStats?: PropertyStatsUncheckedCreateNestedOneWithoutPropertyInput
    SavedProperty?: SavedPropertyUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    rent?: IntFieldUpdateOperationsInput | number
    deposit?: IntFieldUpdateOperationsInput | number
    maintenance?: IntFieldUpdateOperationsInput | number
    sharing?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bhk?: EnumBHKFieldUpdateOperationsInput | $Enums.BHK
    suitableFitFor?: PropertyUpdatesuitableFitForInput | string[]
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    formattedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    visitingHrs?: NullableStringFieldUpdateOperationsInput | string | null
    availableFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownershipProof?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amenities?: PropertyUpdateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationStatus?: EnumPropertyVerificationStatusFieldUpdateOperationsInput | $Enums.PropertyVerificationStatus
    PropertyStats?: PropertyStatsUpdateOneWithoutPropertyNestedInput
    SavedProperty?: SavedPropertyUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    rent?: IntFieldUpdateOperationsInput | number
    deposit?: IntFieldUpdateOperationsInput | number
    maintenance?: IntFieldUpdateOperationsInput | number
    sharing?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bhk?: EnumBHKFieldUpdateOperationsInput | $Enums.BHK
    suitableFitFor?: PropertyUpdatesuitableFitForInput | string[]
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    formattedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    visitingHrs?: NullableStringFieldUpdateOperationsInput | string | null
    availableFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownershipProof?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amenities?: PropertyUpdateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationStatus?: EnumPropertyVerificationStatusFieldUpdateOperationsInput | $Enums.PropertyVerificationStatus
    PropertyStats?: PropertyStatsUncheckedUpdateOneWithoutPropertyNestedInput
    SavedProperty?: SavedPropertyUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateManyInput = {
    id?: string
    title: string
    propertyType: $Enums.PropertyType
    rent: number
    deposit: number
    maintenance: number
    sharing: number
    isAvailable?: boolean
    genderPreference: $Enums.Gender
    bhk: $Enums.BHK
    suitableFitFor?: PropertyCreatesuitableFitForInput | string[]
    addressLine1: string
    addressLine2?: string | null
    locality: string
    city: string
    district: string
    state: string
    country: string
    postalCode: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    formattedAddress?: string | null
    placeId?: string | null
    ownerId: string
    ownerPhone: string
    visitingHrs?: string | null
    availableFrom?: Date | string | null
    ownershipProof?: string | null
    verifiedAt?: Date | string | null
    amenities?: PropertyCreateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    verificationStatus?: $Enums.PropertyVerificationStatus
  }

  export type PropertyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    rent?: IntFieldUpdateOperationsInput | number
    deposit?: IntFieldUpdateOperationsInput | number
    maintenance?: IntFieldUpdateOperationsInput | number
    sharing?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bhk?: EnumBHKFieldUpdateOperationsInput | $Enums.BHK
    suitableFitFor?: PropertyUpdatesuitableFitForInput | string[]
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    formattedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    visitingHrs?: NullableStringFieldUpdateOperationsInput | string | null
    availableFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownershipProof?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amenities?: PropertyUpdateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationStatus?: EnumPropertyVerificationStatusFieldUpdateOperationsInput | $Enums.PropertyVerificationStatus
  }

  export type PropertyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    rent?: IntFieldUpdateOperationsInput | number
    deposit?: IntFieldUpdateOperationsInput | number
    maintenance?: IntFieldUpdateOperationsInput | number
    sharing?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bhk?: EnumBHKFieldUpdateOperationsInput | $Enums.BHK
    suitableFitFor?: PropertyUpdatesuitableFitForInput | string[]
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    formattedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    visitingHrs?: NullableStringFieldUpdateOperationsInput | string | null
    availableFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownershipProof?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amenities?: PropertyUpdateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationStatus?: EnumPropertyVerificationStatusFieldUpdateOperationsInput | $Enums.PropertyVerificationStatus
  }

  export type PropertyStatsCreateInput = {
    id?: string
    viewCount?: number
    saveCount?: number
    Property: PropertyCreateNestedOneWithoutPropertyStatsInput
  }

  export type PropertyStatsUncheckedCreateInput = {
    id?: string
    propertyId: string
    viewCount?: number
    saveCount?: number
  }

  export type PropertyStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewCount?: IntFieldUpdateOperationsInput | number
    saveCount?: IntFieldUpdateOperationsInput | number
    Property?: PropertyUpdateOneRequiredWithoutPropertyStatsNestedInput
  }

  export type PropertyStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    viewCount?: IntFieldUpdateOperationsInput | number
    saveCount?: IntFieldUpdateOperationsInput | number
  }

  export type PropertyStatsCreateManyInput = {
    id?: string
    propertyId: string
    viewCount?: number
    saveCount?: number
  }

  export type PropertyStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewCount?: IntFieldUpdateOperationsInput | number
    saveCount?: IntFieldUpdateOperationsInput | number
  }

  export type PropertyStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    viewCount?: IntFieldUpdateOperationsInput | number
    saveCount?: IntFieldUpdateOperationsInput | number
  }

  export type SavedPropertyCreateInput = {
    id?: string
    userId: string
    savedAt?: Date | string
    Property: PropertyCreateNestedOneWithoutSavedPropertyInput
  }

  export type SavedPropertyUncheckedCreateInput = {
    id?: string
    userId: string
    propertyId: string
    savedAt?: Date | string
  }

  export type SavedPropertyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Property?: PropertyUpdateOneRequiredWithoutSavedPropertyNestedInput
  }

  export type SavedPropertyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedPropertyCreateManyInput = {
    id?: string
    userId: string
    propertyId: string
    savedAt?: Date | string
  }

  export type SavedPropertyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedPropertyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumPropertyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeFilter<$PrismaModel> | $Enums.PropertyType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type EnumBHKFilter<$PrismaModel = never> = {
    equals?: $Enums.BHK | EnumBHKFieldRefInput<$PrismaModel>
    in?: $Enums.BHK[] | ListEnumBHKFieldRefInput<$PrismaModel>
    notIn?: $Enums.BHK[] | ListEnumBHKFieldRefInput<$PrismaModel>
    not?: NestedEnumBHKFilter<$PrismaModel> | $Enums.BHK
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumAmenityTypeNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.AmenityType[] | ListEnumAmenityTypeFieldRefInput<$PrismaModel> | null
    has?: $Enums.AmenityType | EnumAmenityTypeFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.AmenityType[] | ListEnumAmenityTypeFieldRefInput<$PrismaModel>
    hasSome?: $Enums.AmenityType[] | ListEnumAmenityTypeFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumPropertyVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyVerificationStatus | EnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyVerificationStatus[] | ListEnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyVerificationStatus[] | ListEnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyVerificationStatusFilter<$PrismaModel> | $Enums.PropertyVerificationStatus
  }

  export type PropertyStatsNullableRelationFilter = {
    is?: PropertyStatsWhereInput | null
    isNot?: PropertyStatsWhereInput | null
  }

  export type SavedPropertyListRelationFilter = {
    every?: SavedPropertyWhereInput
    some?: SavedPropertyWhereInput
    none?: SavedPropertyWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SavedPropertyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    propertyType?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    maintenance?: SortOrder
    sharing?: SortOrder
    isAvailable?: SortOrder
    genderPreference?: SortOrder
    bhk?: SortOrder
    suitableFitFor?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    locality?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    formattedAddress?: SortOrder
    placeId?: SortOrder
    ownerId?: SortOrder
    ownerPhone?: SortOrder
    visitingHrs?: SortOrder
    availableFrom?: SortOrder
    ownershipProof?: SortOrder
    verifiedAt?: SortOrder
    amenities?: SortOrder
    rules?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    verificationStatus?: SortOrder
  }

  export type PropertyAvgOrderByAggregateInput = {
    rent?: SortOrder
    deposit?: SortOrder
    maintenance?: SortOrder
    sharing?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type PropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    propertyType?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    maintenance?: SortOrder
    sharing?: SortOrder
    isAvailable?: SortOrder
    genderPreference?: SortOrder
    bhk?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    locality?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    formattedAddress?: SortOrder
    placeId?: SortOrder
    ownerId?: SortOrder
    ownerPhone?: SortOrder
    visitingHrs?: SortOrder
    availableFrom?: SortOrder
    ownershipProof?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    verificationStatus?: SortOrder
  }

  export type PropertyMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    propertyType?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    maintenance?: SortOrder
    sharing?: SortOrder
    isAvailable?: SortOrder
    genderPreference?: SortOrder
    bhk?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    locality?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    formattedAddress?: SortOrder
    placeId?: SortOrder
    ownerId?: SortOrder
    ownerPhone?: SortOrder
    visitingHrs?: SortOrder
    availableFrom?: SortOrder
    ownershipProof?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    verificationStatus?: SortOrder
  }

  export type PropertySumOrderByAggregateInput = {
    rent?: SortOrder
    deposit?: SortOrder
    maintenance?: SortOrder
    sharing?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumPropertyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PropertyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyTypeFilter<$PrismaModel>
    _max?: NestedEnumPropertyTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type EnumBHKWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BHK | EnumBHKFieldRefInput<$PrismaModel>
    in?: $Enums.BHK[] | ListEnumBHKFieldRefInput<$PrismaModel>
    notIn?: $Enums.BHK[] | ListEnumBHKFieldRefInput<$PrismaModel>
    not?: NestedEnumBHKWithAggregatesFilter<$PrismaModel> | $Enums.BHK
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBHKFilter<$PrismaModel>
    _max?: NestedEnumBHKFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumPropertyVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyVerificationStatus | EnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyVerificationStatus[] | ListEnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyVerificationStatus[] | ListEnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.PropertyVerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumPropertyVerificationStatusFilter<$PrismaModel>
  }

  export type PropertyRelationFilter = {
    is?: PropertyWhereInput
    isNot?: PropertyWhereInput
  }

  export type PropertyStatsCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    viewCount?: SortOrder
    saveCount?: SortOrder
  }

  export type PropertyStatsAvgOrderByAggregateInput = {
    viewCount?: SortOrder
    saveCount?: SortOrder
  }

  export type PropertyStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    viewCount?: SortOrder
    saveCount?: SortOrder
  }

  export type PropertyStatsMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    viewCount?: SortOrder
    saveCount?: SortOrder
  }

  export type PropertyStatsSumOrderByAggregateInput = {
    viewCount?: SortOrder
    saveCount?: SortOrder
  }

  export type SavedPropertyUserIdPropertyIdCompoundUniqueInput = {
    userId: string
    propertyId: string
  }

  export type SavedPropertyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    savedAt?: SortOrder
  }

  export type SavedPropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    savedAt?: SortOrder
  }

  export type SavedPropertyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    savedAt?: SortOrder
  }

  export type PropertyCreatesuitableFitForInput = {
    set: string[]
  }

  export type PropertyCreateamenitiesInput = {
    set: $Enums.AmenityType[]
  }

  export type PropertyCreateimagesInput = {
    set: string[]
  }

  export type PropertyStatsCreateNestedOneWithoutPropertyInput = {
    create?: XOR<PropertyStatsCreateWithoutPropertyInput, PropertyStatsUncheckedCreateWithoutPropertyInput>
    connectOrCreate?: PropertyStatsCreateOrConnectWithoutPropertyInput
    connect?: PropertyStatsWhereUniqueInput
  }

  export type SavedPropertyCreateNestedManyWithoutPropertyInput = {
    create?: XOR<SavedPropertyCreateWithoutPropertyInput, SavedPropertyUncheckedCreateWithoutPropertyInput> | SavedPropertyCreateWithoutPropertyInput[] | SavedPropertyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SavedPropertyCreateOrConnectWithoutPropertyInput | SavedPropertyCreateOrConnectWithoutPropertyInput[]
    createMany?: SavedPropertyCreateManyPropertyInputEnvelope
    connect?: SavedPropertyWhereUniqueInput | SavedPropertyWhereUniqueInput[]
  }

  export type PropertyStatsUncheckedCreateNestedOneWithoutPropertyInput = {
    create?: XOR<PropertyStatsCreateWithoutPropertyInput, PropertyStatsUncheckedCreateWithoutPropertyInput>
    connectOrCreate?: PropertyStatsCreateOrConnectWithoutPropertyInput
    connect?: PropertyStatsWhereUniqueInput
  }

  export type SavedPropertyUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<SavedPropertyCreateWithoutPropertyInput, SavedPropertyUncheckedCreateWithoutPropertyInput> | SavedPropertyCreateWithoutPropertyInput[] | SavedPropertyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SavedPropertyCreateOrConnectWithoutPropertyInput | SavedPropertyCreateOrConnectWithoutPropertyInput[]
    createMany?: SavedPropertyCreateManyPropertyInputEnvelope
    connect?: SavedPropertyWhereUniqueInput | SavedPropertyWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumPropertyTypeFieldUpdateOperationsInput = {
    set?: $Enums.PropertyType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type EnumBHKFieldUpdateOperationsInput = {
    set?: $Enums.BHK
  }

  export type PropertyUpdatesuitableFitForInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PropertyUpdateamenitiesInput = {
    set?: $Enums.AmenityType[]
    push?: $Enums.AmenityType | $Enums.AmenityType[]
  }

  export type PropertyUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumPropertyVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.PropertyVerificationStatus
  }

  export type PropertyStatsUpdateOneWithoutPropertyNestedInput = {
    create?: XOR<PropertyStatsCreateWithoutPropertyInput, PropertyStatsUncheckedCreateWithoutPropertyInput>
    connectOrCreate?: PropertyStatsCreateOrConnectWithoutPropertyInput
    upsert?: PropertyStatsUpsertWithoutPropertyInput
    disconnect?: PropertyStatsWhereInput | boolean
    delete?: PropertyStatsWhereInput | boolean
    connect?: PropertyStatsWhereUniqueInput
    update?: XOR<XOR<PropertyStatsUpdateToOneWithWhereWithoutPropertyInput, PropertyStatsUpdateWithoutPropertyInput>, PropertyStatsUncheckedUpdateWithoutPropertyInput>
  }

  export type SavedPropertyUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<SavedPropertyCreateWithoutPropertyInput, SavedPropertyUncheckedCreateWithoutPropertyInput> | SavedPropertyCreateWithoutPropertyInput[] | SavedPropertyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SavedPropertyCreateOrConnectWithoutPropertyInput | SavedPropertyCreateOrConnectWithoutPropertyInput[]
    upsert?: SavedPropertyUpsertWithWhereUniqueWithoutPropertyInput | SavedPropertyUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: SavedPropertyCreateManyPropertyInputEnvelope
    set?: SavedPropertyWhereUniqueInput | SavedPropertyWhereUniqueInput[]
    disconnect?: SavedPropertyWhereUniqueInput | SavedPropertyWhereUniqueInput[]
    delete?: SavedPropertyWhereUniqueInput | SavedPropertyWhereUniqueInput[]
    connect?: SavedPropertyWhereUniqueInput | SavedPropertyWhereUniqueInput[]
    update?: SavedPropertyUpdateWithWhereUniqueWithoutPropertyInput | SavedPropertyUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: SavedPropertyUpdateManyWithWhereWithoutPropertyInput | SavedPropertyUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: SavedPropertyScalarWhereInput | SavedPropertyScalarWhereInput[]
  }

  export type PropertyStatsUncheckedUpdateOneWithoutPropertyNestedInput = {
    create?: XOR<PropertyStatsCreateWithoutPropertyInput, PropertyStatsUncheckedCreateWithoutPropertyInput>
    connectOrCreate?: PropertyStatsCreateOrConnectWithoutPropertyInput
    upsert?: PropertyStatsUpsertWithoutPropertyInput
    disconnect?: PropertyStatsWhereInput | boolean
    delete?: PropertyStatsWhereInput | boolean
    connect?: PropertyStatsWhereUniqueInput
    update?: XOR<XOR<PropertyStatsUpdateToOneWithWhereWithoutPropertyInput, PropertyStatsUpdateWithoutPropertyInput>, PropertyStatsUncheckedUpdateWithoutPropertyInput>
  }

  export type SavedPropertyUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<SavedPropertyCreateWithoutPropertyInput, SavedPropertyUncheckedCreateWithoutPropertyInput> | SavedPropertyCreateWithoutPropertyInput[] | SavedPropertyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SavedPropertyCreateOrConnectWithoutPropertyInput | SavedPropertyCreateOrConnectWithoutPropertyInput[]
    upsert?: SavedPropertyUpsertWithWhereUniqueWithoutPropertyInput | SavedPropertyUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: SavedPropertyCreateManyPropertyInputEnvelope
    set?: SavedPropertyWhereUniqueInput | SavedPropertyWhereUniqueInput[]
    disconnect?: SavedPropertyWhereUniqueInput | SavedPropertyWhereUniqueInput[]
    delete?: SavedPropertyWhereUniqueInput | SavedPropertyWhereUniqueInput[]
    connect?: SavedPropertyWhereUniqueInput | SavedPropertyWhereUniqueInput[]
    update?: SavedPropertyUpdateWithWhereUniqueWithoutPropertyInput | SavedPropertyUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: SavedPropertyUpdateManyWithWhereWithoutPropertyInput | SavedPropertyUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: SavedPropertyScalarWhereInput | SavedPropertyScalarWhereInput[]
  }

  export type PropertyCreateNestedOneWithoutPropertyStatsInput = {
    create?: XOR<PropertyCreateWithoutPropertyStatsInput, PropertyUncheckedCreateWithoutPropertyStatsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutPropertyStatsInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutPropertyStatsNestedInput = {
    create?: XOR<PropertyCreateWithoutPropertyStatsInput, PropertyUncheckedCreateWithoutPropertyStatsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutPropertyStatsInput
    upsert?: PropertyUpsertWithoutPropertyStatsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutPropertyStatsInput, PropertyUpdateWithoutPropertyStatsInput>, PropertyUncheckedUpdateWithoutPropertyStatsInput>
  }

  export type PropertyCreateNestedOneWithoutSavedPropertyInput = {
    create?: XOR<PropertyCreateWithoutSavedPropertyInput, PropertyUncheckedCreateWithoutSavedPropertyInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutSavedPropertyInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutSavedPropertyNestedInput = {
    create?: XOR<PropertyCreateWithoutSavedPropertyInput, PropertyUncheckedCreateWithoutSavedPropertyInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutSavedPropertyInput
    upsert?: PropertyUpsertWithoutSavedPropertyInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutSavedPropertyInput, PropertyUpdateWithoutSavedPropertyInput>, PropertyUncheckedUpdateWithoutSavedPropertyInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumPropertyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeFilter<$PrismaModel> | $Enums.PropertyType
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumBHKFilter<$PrismaModel = never> = {
    equals?: $Enums.BHK | EnumBHKFieldRefInput<$PrismaModel>
    in?: $Enums.BHK[] | ListEnumBHKFieldRefInput<$PrismaModel>
    notIn?: $Enums.BHK[] | ListEnumBHKFieldRefInput<$PrismaModel>
    not?: NestedEnumBHKFilter<$PrismaModel> | $Enums.BHK
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumPropertyVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyVerificationStatus | EnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyVerificationStatus[] | ListEnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyVerificationStatus[] | ListEnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyVerificationStatusFilter<$PrismaModel> | $Enums.PropertyVerificationStatus
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PropertyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyTypeFilter<$PrismaModel>
    _max?: NestedEnumPropertyTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedEnumBHKWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BHK | EnumBHKFieldRefInput<$PrismaModel>
    in?: $Enums.BHK[] | ListEnumBHKFieldRefInput<$PrismaModel>
    notIn?: $Enums.BHK[] | ListEnumBHKFieldRefInput<$PrismaModel>
    not?: NestedEnumBHKWithAggregatesFilter<$PrismaModel> | $Enums.BHK
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBHKFilter<$PrismaModel>
    _max?: NestedEnumBHKFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumPropertyVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyVerificationStatus | EnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyVerificationStatus[] | ListEnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyVerificationStatus[] | ListEnumPropertyVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.PropertyVerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumPropertyVerificationStatusFilter<$PrismaModel>
  }

  export type PropertyStatsCreateWithoutPropertyInput = {
    id?: string
    viewCount?: number
    saveCount?: number
  }

  export type PropertyStatsUncheckedCreateWithoutPropertyInput = {
    id?: string
    viewCount?: number
    saveCount?: number
  }

  export type PropertyStatsCreateOrConnectWithoutPropertyInput = {
    where: PropertyStatsWhereUniqueInput
    create: XOR<PropertyStatsCreateWithoutPropertyInput, PropertyStatsUncheckedCreateWithoutPropertyInput>
  }

  export type SavedPropertyCreateWithoutPropertyInput = {
    id?: string
    userId: string
    savedAt?: Date | string
  }

  export type SavedPropertyUncheckedCreateWithoutPropertyInput = {
    id?: string
    userId: string
    savedAt?: Date | string
  }

  export type SavedPropertyCreateOrConnectWithoutPropertyInput = {
    where: SavedPropertyWhereUniqueInput
    create: XOR<SavedPropertyCreateWithoutPropertyInput, SavedPropertyUncheckedCreateWithoutPropertyInput>
  }

  export type SavedPropertyCreateManyPropertyInputEnvelope = {
    data: SavedPropertyCreateManyPropertyInput | SavedPropertyCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PropertyStatsUpsertWithoutPropertyInput = {
    update: XOR<PropertyStatsUpdateWithoutPropertyInput, PropertyStatsUncheckedUpdateWithoutPropertyInput>
    create: XOR<PropertyStatsCreateWithoutPropertyInput, PropertyStatsUncheckedCreateWithoutPropertyInput>
    where?: PropertyStatsWhereInput
  }

  export type PropertyStatsUpdateToOneWithWhereWithoutPropertyInput = {
    where?: PropertyStatsWhereInput
    data: XOR<PropertyStatsUpdateWithoutPropertyInput, PropertyStatsUncheckedUpdateWithoutPropertyInput>
  }

  export type PropertyStatsUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewCount?: IntFieldUpdateOperationsInput | number
    saveCount?: IntFieldUpdateOperationsInput | number
  }

  export type PropertyStatsUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    viewCount?: IntFieldUpdateOperationsInput | number
    saveCount?: IntFieldUpdateOperationsInput | number
  }

  export type SavedPropertyUpsertWithWhereUniqueWithoutPropertyInput = {
    where: SavedPropertyWhereUniqueInput
    update: XOR<SavedPropertyUpdateWithoutPropertyInput, SavedPropertyUncheckedUpdateWithoutPropertyInput>
    create: XOR<SavedPropertyCreateWithoutPropertyInput, SavedPropertyUncheckedCreateWithoutPropertyInput>
  }

  export type SavedPropertyUpdateWithWhereUniqueWithoutPropertyInput = {
    where: SavedPropertyWhereUniqueInput
    data: XOR<SavedPropertyUpdateWithoutPropertyInput, SavedPropertyUncheckedUpdateWithoutPropertyInput>
  }

  export type SavedPropertyUpdateManyWithWhereWithoutPropertyInput = {
    where: SavedPropertyScalarWhereInput
    data: XOR<SavedPropertyUpdateManyMutationInput, SavedPropertyUncheckedUpdateManyWithoutPropertyInput>
  }

  export type SavedPropertyScalarWhereInput = {
    AND?: SavedPropertyScalarWhereInput | SavedPropertyScalarWhereInput[]
    OR?: SavedPropertyScalarWhereInput[]
    NOT?: SavedPropertyScalarWhereInput | SavedPropertyScalarWhereInput[]
    id?: StringFilter<"SavedProperty"> | string
    userId?: StringFilter<"SavedProperty"> | string
    propertyId?: StringFilter<"SavedProperty"> | string
    savedAt?: DateTimeFilter<"SavedProperty"> | Date | string
  }

  export type PropertyCreateWithoutPropertyStatsInput = {
    id?: string
    title: string
    propertyType: $Enums.PropertyType
    rent: number
    deposit: number
    maintenance: number
    sharing: number
    isAvailable?: boolean
    genderPreference: $Enums.Gender
    bhk: $Enums.BHK
    suitableFitFor?: PropertyCreatesuitableFitForInput | string[]
    addressLine1: string
    addressLine2?: string | null
    locality: string
    city: string
    district: string
    state: string
    country: string
    postalCode: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    formattedAddress?: string | null
    placeId?: string | null
    ownerId: string
    ownerPhone: string
    visitingHrs?: string | null
    availableFrom?: Date | string | null
    ownershipProof?: string | null
    verifiedAt?: Date | string | null
    amenities?: PropertyCreateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    verificationStatus?: $Enums.PropertyVerificationStatus
    SavedProperty?: SavedPropertyCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutPropertyStatsInput = {
    id?: string
    title: string
    propertyType: $Enums.PropertyType
    rent: number
    deposit: number
    maintenance: number
    sharing: number
    isAvailable?: boolean
    genderPreference: $Enums.Gender
    bhk: $Enums.BHK
    suitableFitFor?: PropertyCreatesuitableFitForInput | string[]
    addressLine1: string
    addressLine2?: string | null
    locality: string
    city: string
    district: string
    state: string
    country: string
    postalCode: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    formattedAddress?: string | null
    placeId?: string | null
    ownerId: string
    ownerPhone: string
    visitingHrs?: string | null
    availableFrom?: Date | string | null
    ownershipProof?: string | null
    verifiedAt?: Date | string | null
    amenities?: PropertyCreateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    verificationStatus?: $Enums.PropertyVerificationStatus
    SavedProperty?: SavedPropertyUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutPropertyStatsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutPropertyStatsInput, PropertyUncheckedCreateWithoutPropertyStatsInput>
  }

  export type PropertyUpsertWithoutPropertyStatsInput = {
    update: XOR<PropertyUpdateWithoutPropertyStatsInput, PropertyUncheckedUpdateWithoutPropertyStatsInput>
    create: XOR<PropertyCreateWithoutPropertyStatsInput, PropertyUncheckedCreateWithoutPropertyStatsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutPropertyStatsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutPropertyStatsInput, PropertyUncheckedUpdateWithoutPropertyStatsInput>
  }

  export type PropertyUpdateWithoutPropertyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    rent?: IntFieldUpdateOperationsInput | number
    deposit?: IntFieldUpdateOperationsInput | number
    maintenance?: IntFieldUpdateOperationsInput | number
    sharing?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bhk?: EnumBHKFieldUpdateOperationsInput | $Enums.BHK
    suitableFitFor?: PropertyUpdatesuitableFitForInput | string[]
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    formattedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    visitingHrs?: NullableStringFieldUpdateOperationsInput | string | null
    availableFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownershipProof?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amenities?: PropertyUpdateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationStatus?: EnumPropertyVerificationStatusFieldUpdateOperationsInput | $Enums.PropertyVerificationStatus
    SavedProperty?: SavedPropertyUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutPropertyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    rent?: IntFieldUpdateOperationsInput | number
    deposit?: IntFieldUpdateOperationsInput | number
    maintenance?: IntFieldUpdateOperationsInput | number
    sharing?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bhk?: EnumBHKFieldUpdateOperationsInput | $Enums.BHK
    suitableFitFor?: PropertyUpdatesuitableFitForInput | string[]
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    formattedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    visitingHrs?: NullableStringFieldUpdateOperationsInput | string | null
    availableFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownershipProof?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amenities?: PropertyUpdateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationStatus?: EnumPropertyVerificationStatusFieldUpdateOperationsInput | $Enums.PropertyVerificationStatus
    SavedProperty?: SavedPropertyUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateWithoutSavedPropertyInput = {
    id?: string
    title: string
    propertyType: $Enums.PropertyType
    rent: number
    deposit: number
    maintenance: number
    sharing: number
    isAvailable?: boolean
    genderPreference: $Enums.Gender
    bhk: $Enums.BHK
    suitableFitFor?: PropertyCreatesuitableFitForInput | string[]
    addressLine1: string
    addressLine2?: string | null
    locality: string
    city: string
    district: string
    state: string
    country: string
    postalCode: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    formattedAddress?: string | null
    placeId?: string | null
    ownerId: string
    ownerPhone: string
    visitingHrs?: string | null
    availableFrom?: Date | string | null
    ownershipProof?: string | null
    verifiedAt?: Date | string | null
    amenities?: PropertyCreateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    verificationStatus?: $Enums.PropertyVerificationStatus
    PropertyStats?: PropertyStatsCreateNestedOneWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutSavedPropertyInput = {
    id?: string
    title: string
    propertyType: $Enums.PropertyType
    rent: number
    deposit: number
    maintenance: number
    sharing: number
    isAvailable?: boolean
    genderPreference: $Enums.Gender
    bhk: $Enums.BHK
    suitableFitFor?: PropertyCreatesuitableFitForInput | string[]
    addressLine1: string
    addressLine2?: string | null
    locality: string
    city: string
    district: string
    state: string
    country: string
    postalCode: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    formattedAddress?: string | null
    placeId?: string | null
    ownerId: string
    ownerPhone: string
    visitingHrs?: string | null
    availableFrom?: Date | string | null
    ownershipProof?: string | null
    verifiedAt?: Date | string | null
    amenities?: PropertyCreateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    verificationStatus?: $Enums.PropertyVerificationStatus
    PropertyStats?: PropertyStatsUncheckedCreateNestedOneWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutSavedPropertyInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutSavedPropertyInput, PropertyUncheckedCreateWithoutSavedPropertyInput>
  }

  export type PropertyUpsertWithoutSavedPropertyInput = {
    update: XOR<PropertyUpdateWithoutSavedPropertyInput, PropertyUncheckedUpdateWithoutSavedPropertyInput>
    create: XOR<PropertyCreateWithoutSavedPropertyInput, PropertyUncheckedCreateWithoutSavedPropertyInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutSavedPropertyInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutSavedPropertyInput, PropertyUncheckedUpdateWithoutSavedPropertyInput>
  }

  export type PropertyUpdateWithoutSavedPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    rent?: IntFieldUpdateOperationsInput | number
    deposit?: IntFieldUpdateOperationsInput | number
    maintenance?: IntFieldUpdateOperationsInput | number
    sharing?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bhk?: EnumBHKFieldUpdateOperationsInput | $Enums.BHK
    suitableFitFor?: PropertyUpdatesuitableFitForInput | string[]
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    formattedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    visitingHrs?: NullableStringFieldUpdateOperationsInput | string | null
    availableFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownershipProof?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amenities?: PropertyUpdateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationStatus?: EnumPropertyVerificationStatusFieldUpdateOperationsInput | $Enums.PropertyVerificationStatus
    PropertyStats?: PropertyStatsUpdateOneWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutSavedPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    rent?: IntFieldUpdateOperationsInput | number
    deposit?: IntFieldUpdateOperationsInput | number
    maintenance?: IntFieldUpdateOperationsInput | number
    sharing?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bhk?: EnumBHKFieldUpdateOperationsInput | $Enums.BHK
    suitableFitFor?: PropertyUpdatesuitableFitForInput | string[]
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    formattedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    visitingHrs?: NullableStringFieldUpdateOperationsInput | string | null
    availableFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownershipProof?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amenities?: PropertyUpdateamenitiesInput | $Enums.AmenityType[]
    rules?: NullableJsonNullValueInput | InputJsonValue
    images?: PropertyUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationStatus?: EnumPropertyVerificationStatusFieldUpdateOperationsInput | $Enums.PropertyVerificationStatus
    PropertyStats?: PropertyStatsUncheckedUpdateOneWithoutPropertyNestedInput
  }

  export type SavedPropertyCreateManyPropertyInput = {
    id?: string
    userId: string
    savedAt?: Date | string
  }

  export type SavedPropertyUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedPropertyUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedPropertyUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PropertyCountOutputTypeDefaultArgs instead
     */
    export type PropertyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PropertyDefaultArgs instead
     */
    export type PropertyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PropertyStatsDefaultArgs instead
     */
    export type PropertyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyStatsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SavedPropertyDefaultArgs instead
     */
    export type SavedPropertyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SavedPropertyDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}